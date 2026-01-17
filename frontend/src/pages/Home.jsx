import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { 
  FiSearch, 
  FiDollarSign, 
  FiShield, 
  FiUsers,
  FiArrowRight,
  FiBook,
  FiMonitor,
  FiHome
} from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FiDollarSign className="h-8 w-8" />,
      title: "Best Prices",
      description: "Find amazing deals on used items from fellow students"
    },
    {
      icon: <FiShield className="h-8 w-8" />,
      title: "Safe & Secure",
      description: "All users are verified and transactions are secure"
    },
    {
      icon: <FiUsers className="h-8 w-8" />,
      title: "College Community",
      description: "Buy and sell within your trusted college network"
    },
    {
      icon: <FiSearch className="h-8 w-8" />,
      title: "Easy to Find",
      description: "Advanced search and filtering to find exactly what you need"
    }
  ];

  const categories = [
    {
      icon: <FiBook className="h-12 w-12" />,
      title: "Textbooks",
      description: "Find textbooks for all your courses",
      link: "/products?category=Books"
    },
    {
      icon: <FiMonitor className="h-12 w-12" />,
      title: "Electronics",
      description: "Laptops, phones, and gadgets",
      link: "/products?category=Electronics"
    },
    {
      icon: <FiHome className="h-12 w-12" />,
      title: "Furniture",
      description: "Dorm and apartment furniture",
      link: "/products?category=Furniture"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 translate-y-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12 -translate-y-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-100">
                OwnerSwap
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              The marketplace designed for college students. Buy and sell used items 
              within your college community at unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FiSearch size={20} />
                <span>Browse Products</span>
              </Link>
              
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Get Started</span>
                  <FiArrowRight size={20} />
                </Link>
              )}
              
              {isAuthenticated && (
                <Link
                  to="/create-product"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Sell an Item</span>
                  <FiArrowRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OwnerSwap?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the perfect platform for students to connect, trade, and save money
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="card card-hover p-10 text-center group bg-gradient-to-br from-white to-gray-50"
              >
                <div className="text-primary-600 mb-6 group-hover:scale-125 transition-all duration-300 mx-auto">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <span className="text-primary-600 font-semibold flex items-center justify-center space-x-1 group-hover:space-x-3 transition-all duration-300">
                  <span>Explore Now</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already saving money and decluttering their space
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/create-product"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>List Your First Item</span>
              <FiArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
