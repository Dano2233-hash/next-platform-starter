import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

export default function Products({ products, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedPlatform = searchParams.get('platform') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const handleSelectCategory = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    setSearchParams(params);
  };

  const handleSelectPlatform = (platform) => {
    const params = new URLSearchParams(searchParams);
    if (platform === 'all') {
      params.delete('platform');
    } else {
      params.set('platform', platform);
    }
    setSearchParams(params);
  };

  // Filter products memoized
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Platform Match
      const matchesPlatform =
        selectedPlatform === 'all' ||
        product.platform.toLowerCase() === selectedPlatform.toLowerCase();

      // Search Query Match
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPlatform && matchesSearch;
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery]);

  const platforms = ['all', 'PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0c0d12] to-[#151824] p-6 rounded-2xl border border-[#1a1e29] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#00e5ff] tracking-widest bg-[#00e5ff]/10 px-2 py-0.5 rounded border border-[#00e5ff]/20">
            Dano Catalog
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white mt-2 uppercase tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Catalog'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} currently available
          </p>
        </div>

        {/* Platform selection */}
        <div className="flex flex-wrap gap-1.5">
          {platforms.map((p) => {
            const isActive = selectedPlatform.toLowerCase() === p.toLowerCase();
            return (
              <button
                key={p}
                onClick={() => handleSelectPlatform(p)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border uppercase tracking-wider cursor-pointer select-none transition-all ${
                  isActive
                    ? 'bg-[#00e5ff] text-[#050505] border-[#00e5ff]'
                    : 'bg-[#050505] text-gray-400 border-[#1a1e29] hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Platforms' : p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category selector */}
      <div className="bg-[#0c0d12]/40 p-4 rounded-xl border border-[#1a1e29]">
        <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      </div>

      {/* List products */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0c0d12] rounded-2xl border border-[#1a1e29]">
          <div className="p-4 rounded-full bg-[#151824] text-gray-500 mb-4">
            <Gamepad2 size={36} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Products Found</h3>
          <p className="text-xs text-gray-400 mt-1.5 max-w-[320px]">
            We couldn't find any products matching your current filters or query. Try switching filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="mt-6 px-5 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] rounded-lg text-xs font-bold text-white transition-all cursor-pointer select-none"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
