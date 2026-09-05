import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, Search, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [platformFilter, setPlatformFilter] = useState(searchParams.get('platform') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategoryFilter(cat);

    const plat = searchParams.get('platform');
    if (plat) setPlatformFilter(plat);

    const q = searchParams.get('search');
    if (q) setSearchQuery(q);

    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category match
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }

    // Platform match
    if (platformFilter !== 'all' && product.platform !== platformFilter) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchCategory = product.category?.toLowerCase().includes(q);
      const matchPlatform = product.platform?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory && !matchPlatform) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'popular') {
      return (b.soldCount || 0) - (a.soldCount || 0);
    }
    // Default featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const clearFilters = () => {
    setCategoryFilter('all');
    setPlatformFilter('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800">
        <div className="max-w-3xl space-y-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Dano Store Catalog
          </span>
          <h1 className="text-3xl font-black text-white">All Digital Products</h1>
          <p className="text-xs text-slate-400">
            Browse mobile game top-ups, paid Steam titles, console codes, gift cards, and premium subscriptions.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">

        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, game, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl py-2 pl-10 pr-8 text-xs focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            <span className="text-slate-400 font-medium">
              Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills & Platform Selector */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase shrink-0 mr-1">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  categoryFilter === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase shrink-0 mr-1">Platform:</span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => setPlatformFilter(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  platformFilter === plat.id
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800/80 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            ))}

            {(categoryFilter !== 'all' || platformFilter !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 rounded-lg text-xs font-bold text-red-400 bg-red-950/40 border border-red-800/50 hover:bg-red-900/40 whitespace-nowrap ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <p className="text-slate-300 font-bold text-base">No products found matching your filters.</p>
          <p className="text-xs text-slate-500">Try searching for a different keyword or reset your platform/category filters.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-slate-950 font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
