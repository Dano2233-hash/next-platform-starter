import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';

export default function Products({ products, onAddToCart, onBuyNow, searchQuery, onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle active category tracking from URL search param
  const activeCategory = searchParams.get('category') || 'all';

  const handleSelectCategory = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  // Memoized search and filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;

      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.platform.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and filter action header */}
      <div className="bg-[#090911] border border-[#121225] p-5 rounded-2xl space-y-4">
        <h1 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
          🎒 Browse Digital Store
        </h1>
        <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
          Search over dozens of premium games, subscriptions, gift cards, and UC/Diamond packages tailored for Kurdistan. Use categories to drill down.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar value={searchQuery} onChange={onSearch} />
          </div>
          <button
            onClick={() => {
              onSearch('');
              handleSelectCategory('all');
            }}
            className="bg-[#121225] hover:bg-[#1a1a33] border border-[#1a1a2e] text-xs font-bold py-3 rounded-xl uppercase tracking-wider text-gray-300 transition-premium"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Category selector */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={handleSelectCategory}
      />

      {/* Output results count or empty notice */}
      <div>
        <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Showing {filteredProducts.length} items
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#090911] border border-[#121225] p-12 rounded-2xl text-center space-y-4 max-w-md mx-auto">
            <span className="text-3xl block">🔍</span>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">No Products Found</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any digital services matching "{searchQuery}" under this category. Try adjusting your search query or selecting a different platform.
            </p>
            <button
              onClick={() => {
                onSearch('');
                handleSelectCategory('all');
              }}
              className="bg-[#0066ff] hover:bg-[#0055dd] text-xs font-bold text-white px-5 py-2.5 rounded-lg transition-premium"
            >
              Reset Store Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
