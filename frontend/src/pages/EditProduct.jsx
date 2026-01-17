import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';
import ImageUpload from '../components/common/ImageUpload';
import { 
  FiSave, 
  FiX, 
  FiArrowLeft,
  FiDollarSign,
  FiTag,
  FiFileText,
  FiImage,
  FiPhone
} from 'react-icons/fi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    contactInfo: '',
    images: []
  });

  const categories = [
    'Books', 'Electronics', 'Furniture', 'Apparel', 'Sports', 'Accessories', 'Other'
  ];

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProductById(id);
      const productData = response.data.product;

      // Check if user owns this product
      if (productData.seller._id !== user._id) {
        setError('You can only edit your own products');
        return;
      }

      setProduct(productData);
      setFormData({
        title: productData.title,
        description: productData.description,
        price: productData.price.toString(),
        category: productData.category,
        contactInfo: productData.contactInfo,
        images: []
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error.response?.status === 404) {
        setError('Product not found');
      } else {
        setError('Failed to load product details');
      }
    } finally {
      setLoading(false);
    }
  }, [id, user._id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', parseFloat(formData.price));
      submitData.append('category', formData.category);
      
      if (formData.contactInfo.trim()) {
        submitData.append('contactInfo', formData.contactInfo.trim());
      }

      // Add new images
      formData.images.forEach((image) => {
        submitData.append('images', image);
      });

      await productsAPI.updateProduct(id, submitData);
      navigate('/my-products', { replace: true });
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/my-products');
  };

  if (loading) return <Spinner />;

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/my-products')}
            className="btn btn-primary"
          >
            Back to My Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft size={20} className="mr-2" />
            Back to My Products
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600 mt-1">Update your product listing</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <FiTag className="inline mr-1" />
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <FiFileText className="inline mr-1" />
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/1000 characters
              </p>
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-1" />
                  Price (USD) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="inline mr-1" />
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder={`Default: ${user?.email || 'Your email'}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use your default contact information
              </p>
            </div>

            {/* Current Images Display */}
            {product?.images && product.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150x150?text=Error';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiImage className="inline mr-1" />
                Add New Images (Optional)
              </label>
              <ImageUpload onImagesChange={handleImagesChange} maxImages={5} />
              <p className="text-xs text-gray-500 mt-1">
                Upload up to 5 new images. Existing images will be preserved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 sm:flex-none btn btn-primary flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <Spinner size="small" color="white" />
                ) : (
                  <>
                    <FiSave size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="flex-1 sm:flex-none btn btn-outline flex items-center justify-center space-x-2"
              >
                <FiX size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
