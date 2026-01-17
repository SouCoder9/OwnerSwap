import Spinner from './Spinner';

export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Spinner size="large" />
  </div>
);

export const CardSkeleton = () => (
  <div className="card p-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const ProductListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);