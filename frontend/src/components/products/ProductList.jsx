import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';
import { FiFrown } from 'react-icons/fi';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAllProducts(Object.fromEntries(searchParams));
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (error) return (
    <div className="flex flex-col items-center justify-center h-full">
      <FiFrown className="h-12 w-12 text-red-500" />
      <p className="text-red-500 mt-2">{error}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div className="text-center text-gray-600 col-span-full">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
