import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { CATEGORIES, PLATFORMS } from '../data/categories.js';
import { Filter, SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }
      // Platform check
      if (currentPlatform !== 'all' && String(p.platform).toLowerCase() !== currentPlatform.toLowerCase()) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        const matchesPlatform = p.platform?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesPlatform && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured order
    });
  }, [products, currentCategory, currentPlatform, searchQuery, sortBy]);

  const handleSelectCategory = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    setSearchParams(params);
  };

  const handleSelectPlatform = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('platform');
    } else {
      params.set('platform', slug);
    }
    setSearchParams(params);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              Store Catalogue
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Browse Digital Games & Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {filteredProducts.length} digital items with instant local delivery
            </p>
          </div>

          <div className="w-full md:w-80">
            <SearchBar initialQuery={searchQuery} />
          </div>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Categories
            </span>
            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={currentCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Sort Selector */}
          <div className="shrink-0 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs font-medium px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            >
              <option value="featured">Featured / Default</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="pt-2 border-t border-slate-800/60">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Platforms
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PLATFORMS.map((plat) => {
              const isActive = currentPlatform.toLowerCase() === plat.slug.toLowerCase();
              return (
                <button
                  key={plat.id}
                  onClick={() => handleSelectPlatform(plat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border-slate-800/80'
                  }`}
                >
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
          <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
          <button
            onClick={() => setSearchParams(new URLSearchParams())}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-xl"
          >
            Clear All Filters
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
