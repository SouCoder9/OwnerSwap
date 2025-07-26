import { Link } from 'react-router-dom';
import { FiUser, FiMapPin, FiClock } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Books': 'bg-blue-100 text-blue-800',
      'Electronics': 'bg-purple-100 text-purple-800',
      'Furniture': 'bg-green-100 text-green-800',
      'Apparel': 'bg-pink-100 text-pink-800',
      'Sports': 'bg-orange-100 text-orange-800',
      'Accessories': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <Link 
      to={`/products/${product._id}`}
      className="card overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
        </div>

        {/* Sold Badge */}
        {product.isSold && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-primary-600 mt-1">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <FiUser size={12} />
            <span>{product.seller?.username || 'Unknown'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <FiClock size={12} />
            <span>{formatDate(product.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
