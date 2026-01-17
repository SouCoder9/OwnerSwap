import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import ImageUpload from '../components/common/ImageUpload';
import Spinner from '../components/common/Spinner';
import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    contactInfo: user?.email || '',
    whatsappNumber: user?.contactNumber || ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Books',
    'Electronics',
    'Furniture',
    'Apparel',
    'Sports',
    'Accessories',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0';
    } else if (parseFloat(formData.price) > 1000000) {
      newErrors.price = 'Price cannot exceed $1,000,000';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }
    
    // Validate WhatsApp number if provided
    if (formData.whatsappNumber && !/^[+]?\d+$/.test(formData.whatsappNumber.replace(/\s/g, ''))) {
      newErrors.whatsappNumber = 'Please provide a valid WhatsApp number with country code (e.g., +1234567890)';
    }
    
    if (images.length === 0) {
      newErrors.images = 'Please add at least one image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('category', formData.category);
      formDataToSend.append('contactInfo', formData.contactInfo.trim());
      
      // Add WhatsApp number if provided
      if (formData.whatsappNumber.trim()) {
        formDataToSend.append('whatsappNumber', formData.whatsappNumber.trim());
      }
      
      // Add images
      images.forEach((image) => {
        if (image.file) {
          formDataToSend.append('images', image.file);
        }
      });

      const response = await productsAPI.createProduct(formDataToSend);
      
      // Navigate to the created product
      navigate(`/products/${response.data.product._id}`);
      
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create product. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline mb-4 flex items-center space-x-2"
          >
            <FiArrowLeft size={16} />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Create New Listing</h1>
            <p className="text-gray-600 mt-3 text-lg">
              Fill out the form below to list your item for sale
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Global Error */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-r-xl">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="font-medium">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Images */}
          <div className="bg-gray-50 rounded-xl p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              📸 Product Images *
            </label>
            <ImageUpload images={images} setImages={setImages} maxImages={5} />
            {errors.images && (
              <p className="mt-2 text-sm text-red-600">{errors.images}</p>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">📋 Basic Information</h2>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="e.g., MacBook Pro 2021, Organic Chemistry Textbook"
                maxLength={100}
              />
              <div className="flex justify-between mt-1">
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.title.length}/100
                </p>
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-3">
              📝 Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className={`input resize-none ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Describe your item in detail. Include condition, features, reason for selling, etc."
              maxLength={1000}
            />
            <div className="flex justify-between mt-1">
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.description.length}/1000
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">📞 Contact Information</h2>
            
            {/* Email/General Contact */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone Number *
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className={`input ${errors.contactInfo ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Your email or phone number"
              />
              {errors.contactInfo && (
                <p className="mt-1 text-sm text-red-600">{errors.contactInfo}</p>
              )}
            </div>
            
            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number (Optional)
              </label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className={`input ${errors.whatsappNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="e.g., +1234567890"
              />
              {errors.whatsappNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Include country code for WhatsApp contact button (e.g., +1 for US, +91 for India)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline flex-1 py-3"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 py-3 flex items-center justify-center space-x-2 text-lg"
            >
              {loading ? (
                <Spinner size="small" color="white" />
              ) : (
                <span>🚀 Create Listing</span>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
