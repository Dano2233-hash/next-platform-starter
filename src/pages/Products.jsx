import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import { platforms } from '../data/categories';

export default function Products({ products, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state management
  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating

  // Sync state with URL if category or platform changes
  const activeCategory = categoryParam;
  const activePlatform = platformParam;

  const handleCategoryChange = (slug) => {
    setSearchParams((prev) => {
      prev.set('category', slug);
      return prev;
    });
  };

  const handlePlatformChange = (id) => {
    setSearchParams((prev) => {
      prev.set('platform', id);
      return prev;
    });
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesPlatform = activePlatform === 'all' || product.platform === activePlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // popular / default (sold count)
    return b.soldCount - a.soldCount;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-[#07070a] to-slate-950 border border-slate-900/60 p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0066ff] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#7000ff] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="text-center md:text-left space-y-1 z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff] bg-[#00e5ff]/5 px-3 py-1 rounded">
            Dano Catalog
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1.5">
            Gaming Products Catalog
          </h1>
          <p className="text-xs text-slate-400">
            Browse legal activations, gift codes, points, and memberships for Iraq
          </p>
        </div>

        {/* Search Bar component */}
        <div className="w-full md:w-auto z-10 flex justify-center">
          <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
        </div>
      </div>

      {/* Main Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Side Filters (Desktop) */}
        <div className="lg:col-span-1 bg-[#09090c] border border-slate-900/60 p-6 rounded-2xl space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#00e5ff]" />
              <span>Filters</span>
            </h3>
            {/* Clear Filters */}
            {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSearchParams({ category: 'all', platform: 'all' });
                  setSearchQuery('');
                }}
                className="text-[10px] text-red-400 hover:text-red-300 font-extrabold uppercase tracking-wider"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Platforms Filter list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Platforms</h4>
            <div className="flex flex-col gap-1.5">
              {platforms.map((plat) => {
                const isActive = activePlatform === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => handlePlatformChange(plat.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-[#0066ff]/10 text-white border border-[#0066ff]/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/40 border border-transparent'
                    }`}
                  >
                    <span>{plat.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By</span>
            </h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl text-xs py-3 px-3.5 text-slate-300 focus:outline-none focus:border-[#00e5ff] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Right Side CategoryTabs & Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Categories Bar */}
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

          {/* Products Count Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
            <span>
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
            </span>
            {searchQuery && (
              <span>
                Search results for "<strong className="text-white">{searchQuery}</strong>"
              </span>
            )}
          </div>

          {/* Grid */}
          {sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-950/20 border border-slate-950 rounded-3xl p-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-white uppercase tracking-wider">No Products Found</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-sm">
                We couldn't find any products matching your active filters. Try adjusting your search query or categories!
              </p>
              <button
                onClick={() => {
                  setSearchParams({ category: 'all', platform: 'all' });
                  setSearchQuery('');
                }}
                className="mt-6 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
