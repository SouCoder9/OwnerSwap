import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import FilterOptions from '../components/products/FilterOptions';

const Products = () => {
  const [searchParams] = useSearchParams();
  
  const getPageTitle = () => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search && category) {
      return `"${search}" in ${category}`;
    } else if (search) {
      return `"${search}"`;
    } else if (category) {
      return category;
    }
    return 'All Products';
  };

  const getResultsText = () => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    const filters = [];
    if (search) filters.push(`"${search}"`);
    if (category) filters.push(category);
    if (minPrice || maxPrice) {
      const priceRange = `$${minPrice || '0'} - $${maxPrice || '∞'}`;
      filters.push(priceRange);
    }
    
    if (filters.length > 0) {
      return `Results for ${filters.join(', ')}`;
    }
    
    return 'Browse all available products';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600">
              {getResultsText()}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <FilterOptions />
          </div>
        </div>

        {/* Active Filters Display */}
        {Array.from(searchParams.entries()).length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {Array.from(searchParams.entries()).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {key === 'search' && `Search: ${value}`}
                  {key === 'category' && value}
                  {key === 'minPrice' && `Min: $${value}`}
                  {key === 'maxPrice' && `Max: $${value}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product List */}
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
