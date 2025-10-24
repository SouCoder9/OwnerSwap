import { Link } from 'react-router-dom';
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              OwnerSwap
            </Link>
            <p className="text-gray-600 text-sm">
              A marketplace for college students to buy and sell used items. 
              Find great deals on textbooks, electronics, furniture, and more!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Books" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Textbooks
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Furniture" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:soubhadra1234@gmail.com"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
              <a
                href="https://github.com/SouCoder9/OwnerSwap.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              Questions? Reach out to us!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} OwnerSwap. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center space-x-1 mt-2 sm:mt-0">
              <span>Made with</span>
              <FiHeart className="text-red-500" size={16} />
              <span>for college students</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
