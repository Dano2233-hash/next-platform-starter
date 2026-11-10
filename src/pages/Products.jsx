import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const searchQuery = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const isFlash = searchParams.get('flash') === 'true';
  const isTrending = searchParams.get('trending') === 'true';
  const isTopRated = searchParams.get('toprated') === 'true';

  // Local Sort State
  const [sortBy, setSortBy] = useState('featured');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesCat = prod.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (currentCategory !== 'all' && prod.category !== currentCategory) {
        return false;
      }

      // Platform
      if (currentPlatform !== 'all' && prod.platform !== currentPlatform) {
        return false;
      }

      // Flags
      if (isFlash && !prod.isFlashDeal) return false;
      if (isTrending && !prod.isTrending) return false;
      if (isTopRated && !prod.isTopRated) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured order
    });
  }, [products, searchQuery, currentCategory, currentPlatform, isFlash, isTrending, isTopRated, sortBy]);

  const handleCategorySelect = (categorySlug) => {
    const next = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      next.delete('category');
    } else {
      next.set('category', categorySlug);
    }
    setSearchParams(next);
  };

  const handlePlatformSelect = (platform) => {
    const next = new URLSearchParams(searchParams);
    if (platform === 'all') {
      next.delete('platform');
    } else {
      next.set('platform', platform);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || currentCategory !== 'all' || currentPlatform !== 'all' || isFlash || isTrending || isTopRated;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Browse All Digital Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore authentic digital game keys, mobile top-ups, and subscriptions in Kurdistan & Iraq.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0b101e] border border-slate-800 px-3 py-2 rounded-xl text-xs">
            <ArrowUpDown className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured</option>
              <option value="sold" className="bg-slate-900">Top Sales</option>
              <option value="rating" className="bg-slate-900">Highest Rating</option>
              <option value="price-low" className="bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={currentCategory} onSelectCategory={handleCategorySelect} />

      {/* Platform & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#080d1a] p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Platform:</span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformSelect(plat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentPlatform === plat.id
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-900/60"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Results Count & Product Grid */}
      <div>
        <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
          <span>Showing <strong className="text-white">{filteredProducts.length}</strong> items</span>
          {searchQuery && (
            <span className="text-cyan-400">Search results for "{searchQuery}"</span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <Filter className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any items matching your selected criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
