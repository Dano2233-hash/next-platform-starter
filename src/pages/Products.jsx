import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const activePlatform = searchParams.get('platform') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [activeType, setActiveType] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Platform filter
      if (activePlatform !== 'All' && p.platform !== activePlatform && p.platform !== 'Multi-Platform') {
        return false;
      }

      // Type filter
      if (activeType !== 'All' && p.type !== activeType) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesPlatform = p.platform?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesPlatform) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // popular
    });
  }, [products, activeCategory, activePlatform, activeType, searchQuery, sortBy]);

  const handleCategorySelect = (slug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }
    setSearchParams(nextParams);
  };

  const handlePlatformSelect = (plat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (plat === 'All') {
      nextParams.delete('platform');
    } else {
      nextParams.set('platform', plat);
    }
    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setSearchParams({});
    setActiveType('All');
    setSortBy('popular');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Explore Gaming Products & Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Browse verified digital games, currency top-ups, gift cards, and premium subscriptions with instant Kurdistan and Iraq delivery.
        </p>

        {searchQuery && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-400">Search results for:</span>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800">
              "{searchQuery}"
            </span>
            <button
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.delete('search');
                setSearchParams(p);
              }}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Bar */}
      <div>
        <CategoryTabs
          selectedCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Filters & Sorting Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Platform pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform:</span>
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat}
              onClick={() => handlePlatformSelect(plat)}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                activePlatform === plat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Sorting and Type */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {(activeCategory !== 'all' || activePlatform !== 'All' || searchQuery || activeType !== 'All') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 cursor-pointer"
              title="Reset all filters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/30 rounded-2xl border border-slate-800">
          <p className="text-slate-300 text-base font-semibold">No products found matching your criteria</p>
          <p className="text-slate-500 text-xs mt-1">Try adjusting your category, platform, or search keywords.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
            <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
