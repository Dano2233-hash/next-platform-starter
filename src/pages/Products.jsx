import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const Products = ({ products = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'All');
  const [type, setType] = useState(searchParams.get('type') || 'All');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [filterMode, setFilterMode] = useState(searchParams.get('filter') || '');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);

    const q = searchParams.get('search');
    if (q) setSearchTerm(q);

    const f = searchParams.get('filter');
    if (f) setFilterMode(f);
  }, [searchParams]);

  // Apply filters
  let filtered = products.filter((p) => {
    // Category match
    if (category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    // Platform match
    if (platform !== 'All' && p.platform.toLowerCase() !== platform.toLowerCase()) {
      return false;
    }
    // Type match
    if (type !== 'All' && p.type.toLowerCase() !== type.toLowerCase()) {
      return false;
    }
    // Search match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchPlat = p.platform.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchPlat) return false;
    }

    // Filter modes
    if (filterMode === 'flash' && !p.isFlashDeal) return false;
    if (filterMode === 'trending' && !p.isTrending) return false;
    if (filterMode === 'toprated' && !p.isTopRated) return false;

    return true;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = a.packages?.length ? Math.min(...a.packages.map((p) => p.price)) : a.price;
      const priceB = b.packages?.length ? Math.min(...b.packages.map((p) => p.price)) : b.price;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = a.packages?.length ? Math.min(...a.packages.map((p) => p.price)) : a.price;
      const priceB = b.packages?.length ? Math.min(...b.packages.map((p) => p.price)) : b.price;
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default popular / soldCount
    return b.soldCount - a.soldCount;
  });

  const resetFilters = () => {
    setCategory('all');
    setPlatform('All');
    setType('All');
    setSearchTerm('');
    setSortBy('popular');
    setFilterMode('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-[#080d1a] border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Store Products</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore games, top-ups, gift cards, and subscriptions for Kurdistan &amp; Iraq
            </p>
          </div>
          <div className="text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            {filtered.length} Items Found
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          selectedCategory={category}
          onSelectCategory={(id) => {
            setCategory(id);
            setSearchParams((prev) => {
              if (id === 'all') prev.delete('category');
              else prev.set('category', id);
              return prev;
            });
          }}
        />
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0a0f1d] border border-slate-800/80 p-4 rounded-2xl">
        {/* Search */}
        <div className="md:col-span-4 relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-3 text-xs sm:text-sm text-slate-100 outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
        </div>

        {/* Platform Dropdown */}
        <div className="md:col-span-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
          >
            <option value="All">Platform: All</option>
            {PLATFORMS.filter((p) => p !== 'All').map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Type Dropdown */}
        <div className="md:col-span-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
          >
            <option value="All">Type: All</option>
            {PRODUCT_TYPES.filter((t) => t !== 'All').map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="md:col-span-2 flex items-center">
          <button
            onClick={resetFilters}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#0a0f1d] border border-slate-800 rounded-2xl space-y-4">
          <Filter className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No products match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, clearing platform/type filters, or picking a different category.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
