const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const { upload, deleteImage, getPublicIdFromUrl } = require('../config/cloudinary');
const Product = require('../models/Product');
const ApiResponse = require('../utils/response');

const router = express.Router();

// Middleware to fetch product and attach to request
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    req.resource = product;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// Create new product listing (protected route)
router.post('/', authenticate, upload.array('images', 5), [
  body('title')
    .isString()
    .notEmpty()
    .withMessage('Product title is required'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Product description is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Product price must be a positive number'),
  body('category')
    .isIn(['Books', 'Electronics', 'Furniture', 'Apparel', 'Sports', 'Accessories', 'Other'])
    .withMessage('Please select a valid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, price, category, contactInfo, whatsappNumber } = req.body;
    const images = req.files.map(file => file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      images,
      seller: req.user._id,
      contactInfo: contactInfo || req.user.contactNumber || req.user.email,
      whatsappNumber: whatsappNumber || req.user.contactNumber || ''
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product listed successfully',
      product: savedProduct
    });

  } catch (error) {
    console.error('Error listing product:', error);
    return ApiResponse.error(res, 'Internal server error');
  }
});

// Get all active product listings
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };

    const products = await Product.searchProducts(search, filters);

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return ApiResponse.error(res, 'Internal server error');
  }
});

// Get all products posted by the authenticated user
router.get('/my-products', authenticate, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'username email contactNumber');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update a product listing (protected route, only by owner)
router.put('/:id', authenticate, getProduct, authorize('seller'), upload.array('images', 5), [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .isIn(['Books', 'Electronics', 'Furniture', 'Apparel', 'Sports', 'Accessories', 'Other'])
    .withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const product = req.resource;

    const { title, description, price, category, contactInfo, whatsappNumber } = req.body;
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.contactInfo = contactInfo || product.contactInfo;
    product.whatsappNumber = whatsappNumber !== undefined ? whatsappNumber : product.whatsappNumber;

    if (req.files && req.files.length > 0) { // Update images if new images provided
      const imageUrls = req.files.map(file => file.path);
      product.images.push(...imageUrls);
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete a product listing (protected route, only by owner)
router.delete('/:id', authenticate, getProduct, authorize('seller'), async (req, res) => {
  try {
    const product = req.resource;

    for (const imageUrl of product.images) {
      const publicId = getPublicIdFromUrl(imageUrl);
      if (publicId) await deleteImage(publicId); // Delete images from Cloudinary
    }

    await Product.findByIdAndDelete(product._id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mark a product as sold (protected route, only by owner)
router.patch('/:id/mark-sold', authenticate, getProduct, authorize('seller'), async (req, res) => {
  try {
    const product = req.resource;

    if (product.isSold) {
      return res.status(400).json({
        success: false,
        message: 'Product is already marked as sold'
      });
    }

    await product.markAsSold();

    res.status(200).json({
      success: true,
      message: 'Product marked as sold'
    });

  } catch (error) {
    console.error('Error marking product as sold:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;

