import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const queryParam = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('popular');

  // Update URL params helper
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSortBy('popular');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (categoryParam !== 'all' && p.category.toLowerCase() !== categoryParam.toLowerCase()) {
          return false;
        }
        // Platform filter
        if (platformParam !== 'all' && p.platform.toLowerCase() !== platformParam.toLowerCase()) {
          return false;
        }
        // Type filter
        if (typeParam !== 'all' && p.type.toLowerCase() !== typeParam.toLowerCase()) {
          return false;
        }
        // Search query filter
        if (queryParam.trim()) {
          const q = queryParam.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchPlatform = p.platform.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCategory && !matchPlatform) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // default popular
        return (b.soldCount || 0) - (a.soldCount || 0);
      });
  }, [products, categoryParam, platformParam, typeParam, queryParam, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-slate-800 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Product Catalog & Digital Store
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Browse games, instant mobile top-ups, digital gift cards, and subscriptions. Guaranteed fast delivery across Erbil, Sulaymaniyah, Duhok, Baghdad, and all Iraq.
        </p>
      </div>

      {/* Category Tabs Row */}
      <CategoryTabs
        selectedCategory={categoryParam}
        onSelectCategory={(cat) => updateParam('category', cat)}
      />

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Search Box inside page */}
          <div className="w-full lg:w-72">
            <SearchBar
              placeholder="Filter by name..."
              onSearch={(q) => updateParam('search', q)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">

            {/* Platform Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Platform:</span>
              <select
                value={platformParam}
                onChange={(e) => updateParam('platform', e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-slate-100">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Type:</span>
              <select
                value={typeParam}
                onChange={(e) => updateParam('type', e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-slate-100">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-cyan-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-slate-900 text-slate-100">Most Popular</option>
                <option value="price-low" className="bg-slate-900 text-slate-100">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900 text-slate-100">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-slate-100">Highest Rated</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(categoryParam !== 'all' || platformParam !== 'all' || typeParam !== 'all' || queryParam) && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/20 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <span>Showing <strong className="text-slate-200">{filteredProducts.length}</strong> products</span>
        {queryParam && <span>Search result for: "<strong className="text-cyan-400">{queryParam}</strong>"</span>}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We couldn't find any products matching your active filter options or search term. Try resetting your search filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
