const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
    max: [1000000, 'Price cannot exceed 1,000,000']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Books', 'Electronics', 'Furniture', 'Apparel', 'Sports', 'Accessories', 'Other'],
      message: 'Please select a valid category'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(url) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
      },
      message: 'Please provide valid image URLs'
    }
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller information is required']
  },
  contactInfo: {
    type: String,
    required: [true, 'Contact information is required'],
    trim: true
  },
  whatsappNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(number) {
        // Allow empty string or valid international phone number format
        return !number || /^\+?[1-9]\d{1,14}$/.test(number.replace(/\s/g, ''));
      },
      message: 'Please provide a valid WhatsApp number with country code (e.g., +1234567890)'
    }
  },
  isSold: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This automatically manages createdAt and updatedAt
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance and search functionality
productSchema.index({ title: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1 }); // Category filtering
productSchema.index({ price: 1 }); // Price filtering/sorting
productSchema.index({ seller: 1 }); // Seller's products
productSchema.index({ isSold: 1 }); // Active/sold products
productSchema.index({ createdAt: -1 }); // Newest first

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Method to mark product as sold
productSchema.methods.markAsSold = function() {
  this.isSold = true;
  this.updatedAt = Date.now();
  return this.save();
};

// Static method to find active products
productSchema.statics.findActive = function() {
  return this.find({ isSold: false });
};

// Static method to search products
productSchema.statics.searchProducts = function(query, filters = {}) {
  const searchQuery = { isSold: false, ...filters };
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  return this.find(searchQuery)
    .populate('seller', 'username email contactNumber')
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Product', productSchema);
