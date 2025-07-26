import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import Spinner from '../components/common/Spinner';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiTag,
  FiEdit,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getProductById(id);
      setProduct(response.data.product);
    } catch (error) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMarkAsSold = async () => {
    if (!confirm('Are you sure you want to mark this product as sold?')) return;
    
    setActionLoading(true);
    try {
      await productsAPI.markAsSold(id);
      setProduct(prev => ({ ...prev, isSold: true }));
    } catch (error) {
      alert('Failed to mark product as sold');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    
    setActionLoading(true);
    try {
      await productsAPI.deleteProduct(id);
      navigate('/my-products');
    } catch (error) {
      alert('Failed to delete product');
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
        <Link to="/products" className="btn btn-primary">
          <FiArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>
      </div>
    </div>
  );

  const isOwner = isAuthenticated && user?.id === product?.seller?._id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline mb-6 flex items-center space-x-2"
        >
          <FiArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[imageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
              
              {product.isSold && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                    SOLD
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      index === imageIndex ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.isSold && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Sold
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-4xl font-bold text-primary-600">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* Seller Information */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FiUser size={16} className="text-gray-500" />
                  <span className="text-gray-700">{product.seller?.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMail size={16} className="text-gray-500" />
                  <span className="text-gray-700">{product.contactInfo}</span>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <FiClock size={14} />
                <span>Listed on {formatDate(product.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiTag size={14} />
                <span>Product ID: {product._id}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isOwner && !product.isSold && (
                <a
                  href={`mailto:${product.contactInfo}?subject=Interest in ${product.title}&body=Hi, I'm interested in your ${product.title} listed for ${formatPrice(product.price)}.`}
                  className="btn btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <FiMail size={16} />
                  <span>Contact Seller</span>
                </a>
              )}

              {isOwner && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/products/${id}/edit`}
                      className="btn btn-outline flex items-center justify-center space-x-2"
                    >
                      <FiEdit size={16} />
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={handleDelete}
                      disabled={actionLoading}
                      className="btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>

                  {!product.isSold && (
                    <button
                      onClick={handleMarkAsSold}
                      disabled={actionLoading}
                      className="btn bg-green-600 text-white hover:bg-green-700 w-full flex items-center justify-center space-x-2"
                    >
                      <FiCheck size={16} />
                      <span>Mark as Sold</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
