import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const [currentType, setCurrentType] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }

      // Platform filter
      if (currentPlatform !== 'All' && item.platform !== currentPlatform && item.platform !== 'Multi-Platform') {
        return false;
      }

      // Type filter
      if (currentType !== 'All' && item.type !== currentType) {
        return false;
      }

      // Search query filter
      if (currentSearch.trim()) {
        const query = currentSearch.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesTag = item.tag?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'popular' or default
      return b.soldCount - a.soldCount;
    });
  }, [products, currentCategory, currentPlatform, currentType, currentSearch, sortBy]);

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handlePlatformChange = (plat) => {
    const params = new URLSearchParams(searchParams);
    if (plat === 'All') {
      params.delete('platform');
    } else {
      params.set('platform', plat);
    }
    setSearchParams(params);
  };

  const handleSearch = (text) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set('search', text);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setCurrentType('All');
    setSortBy('popular');
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Game Catalog & Top-Ups
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our full collection of genuine digital keys, mobile currency, and gift cards.
          </p>
        </div>

        <div className="w-full md:w-72">
          <SearchBar onSearch={handleSearch} placeholder="Search catalog..." />
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={currentCategory} onSelectCategory={handleCategoryChange} />

      {/* Secondary Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">

        {/* Platforms Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Platform:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {PLATFORMS.map((plat) => (
              <button
                key={plat}
                onClick={() => handlePlatformChange(plat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  currentPlatform === plat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white bg-slate-800/80'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Type & Sort */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Type */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Type:</span>
            <select
              value={currentType}
              onChange={(e) => setCurrentType(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {(currentCategory !== 'all' || currentPlatform !== 'All' || currentType !== 'All' || currentSearch) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors ml-2 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong>{filteredProducts.length}</strong> items</span>
        {currentSearch && <span>Search results for: "{currentSearch}"</span>}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-base font-bold text-slate-300">No products match your criteria</p>
          <p className="text-xs text-slate-400">Try adjusting your search terms or filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;
