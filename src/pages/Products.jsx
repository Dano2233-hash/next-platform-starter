import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'All');
    setSortBy(searchParams.get('sort') || 'default');
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'All' || value === 'default') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('All');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Platform match
    if (selectedPlatform !== 'All' && product.platform !== selectedPlatform) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchType = product.type.toLowerCase().includes(q);
      const matchPlatform = product.platform.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchType && !matchPlatform) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    return 0;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-cyan-900/30 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Digital Store Products</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Browse all official digital games, mobile top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => updateFilters('category', catId)}
      />

      {/* Filter and Search Control Bar */}
      <div className="bg-[#080d2b] border border-cyan-900/30 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 w-full">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                updateFilters('search', val);
              }}
              onClear={() => {
                setSearchQuery('');
                updateFilters('search', '');
              }}
              placeholder="Search by title, platform or category..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Platform Filter dropdown */}
            <div className="flex items-center gap-2 bg-[#05081c] border border-cyan-900/40 rounded-xl px-3 py-2 text-xs">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 font-medium">Platform:</span>
              <select
                value={selectedPlatform}
                onChange={(e) => updateFilters('platform', e.target.value)}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
              >
                {PLATFORMS.map((plat) => (
                  <option key={plat} value={plat} className="bg-[#070c26] text-slate-200">
                    {plat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#05081c] border border-cyan-900/40 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => updateFilters('sort', e.target.value)}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-[#070c26] text-slate-200">Featured</option>
                <option value="popular" className="bg-[#070c26] text-slate-200">Most Popular</option>
                <option value="rating" className="bg-[#070c26] text-slate-200">Highest Rated</option>
                <option value="price-low" className="bg-[#070c26] text-slate-200">Price: Low to High</option>
                <option value="price-high" className="bg-[#070c26] text-slate-200">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'All' || sortBy !== 'default') && (
              <button
                onClick={handleResetFilters}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1"
                title="Reset Filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count indicator */}
        <div className="text-xs text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-2.5">
          <span>Found {filteredProducts.length} items</span>
          {selectedCategory !== 'all' && (
            <span className="text-cyan-400 font-semibold uppercase">Category: {selectedCategory}</span>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#070c26] border border-cyan-900/30 rounded-3xl space-y-4">
          <p className="text-slate-300 font-bold text-base">No products match your search criteria.</p>
          <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
