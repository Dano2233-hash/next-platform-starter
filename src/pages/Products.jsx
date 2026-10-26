import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, Gamepad2, X } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const activePlatform = searchParams.get('platform') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'default';

  // Filter products strictly based on active selection
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Platform filter
      if (activePlatform !== 'all' && product.platform !== activePlatform) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchPlatform = product.platform.toLowerCase().includes(q);
        const matchType = product.type.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchPlatform && !matchType) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortOption === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0;
    });
  }, [products, activeCategory, activePlatform, searchQuery, sortOption]);

  const setCategory = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') newParams.delete('category');
    else newParams.set('category', catId);
    setSearchParams(newParams);
  };

  const setPlatform = (platId) => {
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') newParams.delete('platform');
    else newParams.set('platform', platId);
    setSearchParams(newParams);
  };

  const setSort = (sortVal) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortVal === 'default') newParams.delete('sort');
    else newParams.set('sort', sortVal);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Page Header */}
      <div className="bg-[#080d1f] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
            <span>Digital Store Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse legal digital games, top-ups, gift cards, & memberships for Kurdistan & Iraq
          </p>
        </div>

        <div className="w-full md:w-72">
          <SearchBar />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category Filter</span>
        <CategoryTabs activeCategory={activeCategory} onSelectCategory={setCategory} />
      </div>

      {/* Platforms & Sorting Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#080d1e] border border-slate-800/80 rounded-2xl p-4">
        {/* Platform Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Platform:</span>
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setPlatform(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activePlatform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort Select & Active Badges */}
        <div className="flex items-center space-x-3 shrink-0 ml-auto">
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="default" className="bg-[#090e1f] text-slate-200">Sort: Default</option>
              <option value="sold" className="bg-[#090e1f] text-slate-200">Top Sales</option>
              <option value="rating" className="bg-[#090e1f] text-slate-200">Highest Rated</option>
              <option value="price-low" className="bg-[#090e1f] text-slate-200">Price: Low to High</option>
              <option value="price-high" className="bg-[#090e1f] text-slate-200">Price: High to Low</option>
            </select>
          </div>

          {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery || sortOption !== 'default') && (
            <button
              onClick={clearAllFilters}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold flex items-center space-x-1"
              title="Clear all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Active Notice */}
      {searchQuery && (
        <div className="text-xs text-slate-300">
          Showing search results for "<span className="text-cyan-400 font-bold">{searchQuery}</span>" ({filteredProducts.length} items)
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#080d1e] border border-slate-800 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/20"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
