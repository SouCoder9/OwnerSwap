import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import MyProducts from './pages/MyProducts';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route 
              path="/create-product" 
              element={
                <PrivateRoute>
                  <CreateProduct />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products/:id/edit" 
              element={
                <PrivateRoute>
                  <EditProduct />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-products" 
              element={
                <PrivateRoute>
                  <MyProducts />
                </PrivateRoute>
              } 
            />
            {/* Catch all route - 404 */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1><p className="text-gray-600">The page you're looking for doesn't exist.</p></div></div>} />
          </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
