import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, Grid, SlidersHorizontal, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search term match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        const matchesPlatform = p.platform.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesPlatform) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Platform filter
      if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && p.type !== selectedType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'sold') return b.soldCount - a.soldCount;
      return b.soldCount - a.soldCount; // default popular
    });
  }, [products, searchQuery, selectedCategory, selectedPlatform, selectedType, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Page Header */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Digital Catalog
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Browse paid games, mobile top-ups, gift cards & subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
            {filteredProducts.length} Items Found
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 space-y-4">

        {/* Top Search Input & Sort Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by game name..."
              className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-slate-400 text-xs font-bold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#080b14] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="sold">Top Selling</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-3 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#080b14] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#080b14] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#080b14] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              {PRODUCT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Reset Filters button */}
        {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-12 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
            <Grid className="w-8 h-8" />
          </div>
          <h3 className="text-white font-bold text-lg">No Products Found</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            We couldn't find any products matching your search or filter selection. Try adjusting your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
  );
}
