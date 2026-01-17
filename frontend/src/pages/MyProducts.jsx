import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import Spinner from '../components/common/Spinner';
import { 
  FiPlus, 
  FiEdit, 
  FiEye, 
  FiTrash2, 
  FiCheck, 
  FiClock, 
  FiDollarSign,
  FiPackage
} from 'react-icons/fi';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await productsAPI.getUserProducts();
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch your products');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async (productId) => {
    if (!confirm('Are you sure you want to mark this product as sold?')) return;
    
    setActionLoading(prev => ({ ...prev, [productId]: 'marking' }));
    
    try {
      await productsAPI.markAsSold(productId);
      setProducts(prev => 
        prev.map(product => 
          product._id === productId 
            ? { ...product, isSold: true }
            : product
        )
      );
    } catch (err) {
      console.error('Error marking product as sold:', err);
      alert('Failed to mark product as sold');
    } finally {
      setActionLoading(prev => ({ ...prev, [productId]: null }));
    }
  };

  const handleDelete = async (productId, productTitle) => {
    if (!confirm(`Are you sure you want to delete "${productTitle}"? This action cannot be undone.`)) return;
    
    setActionLoading(prev => ({ ...prev, [productId]: 'deleting' }));
    
    try {
      await productsAPI.deleteProduct(productId);
      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
      setActionLoading(prev => ({ ...prev, [productId]: null }));
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
      month: 'short',
      day: 'numeric'
    });
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

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
            <p className="text-gray-600">
              Manage your listings and track your sales
            </p>
          </div>
          
          <Link
            to="/create-product"
            className="btn btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <FiPlus size={16} />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <FiPackage size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
                <p className="text-gray-600">Total Products</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiCheck size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.isSold).length}
                </p>
                <p className="text-gray-600">Sold Items</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiClock size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => !p.isSold).length}
                </p>
                <p className="text-gray-600">Active Listings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchMyProducts}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first listing to start selling
            </p>
            <Link
              to="/create-product"
              className="btn btn-primary flex items-center space-x-2 mx-auto"
            >
              <FiPlus size={16} />
              <span>Create Your First Product</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="card card-hover overflow-hidden">
                {/* Image */}
                <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </div>

                  {product.isSold && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1 mb-2 text-lg">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <FiClock size={12} />
                      <span>Listed on {formatDate(product.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="btn btn-outline text-xs py-1 flex items-center justify-center space-x-1"
                      >
                        <FiEye size={14} />
                        <span>View</span>
                      </Link>
                      
                      <Link
                        to={`/products/${product._id}/edit`}
                        className="btn btn-outline text-xs py-1 flex items-center justify-center space-x-1"
                      >
                        <FiEdit size={14} />
                        <span>Edit</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {!product.isSold && (
                      <button
                        onClick={() => handleMarkAsSold(product._id)}
                        disabled={actionLoading[product._id]}
                        className="btn btn-success text-xs py-1 flex items-center justify-center space-x-1"
                      >
                          {actionLoading[product._id] === 'marking' ? (
                            <Spinner size="small" color="white" />
                          ) : (
                            <>
                              <FiCheck size={14} />
                              <span>Mark Sold</span>
                            </>
                          )}
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(product._id, product.title)}
                        disabled={actionLoading[product._id]}
                        className={`btn btn-danger text-xs py-1 flex items-center justify-center space-x-1 ${
                          !product.isSold ? '' : 'col-span-2'
                        }`}
                      >
                        {actionLoading[product._id] === 'deleting' ? (
                          <Spinner size="small" color="white" />
                        ) : (
                          <>
                            <FiTrash2 size={14} />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
