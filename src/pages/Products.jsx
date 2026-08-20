import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Filter, Layers, SlidersHorizontal } from 'lucide-react';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const activePlatform = searchParams.get('platform') || 'all';
  const activeType = searchParams.get('type') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('popular');

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category Filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      // Platform Filter
      if (activePlatform !== 'all' && prod.platform !== activePlatform) {
        return false;
      }
      // Type Filter
      if (activeType !== 'all' && prod.type !== activeType) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchDesc = prod.description ? prod.description.toLowerCase().includes(query) : false;
        const matchCat = prod.category.toLowerCase().includes(query);
        const matchPlat = prod.platform.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchPlat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // popular default
    });
  }, [products, activeCategory, activePlatform, activeType, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
              Store Catalog
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Browse paid games, mobile top-ups, gift cards, and subscriptions in IQD currency.
            </p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={(val) => updateFilter('search', val)}
            onClear={() => updateFilter('search', '')}
            placeholder="Search catalog..."
          />
        </div>

        {/* Categories Horizontal Selector */}
        <div className="pt-2">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={(catSlug) => updateFilter('category', catSlug)}
          />
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0f1d] border border-slate-800/80 rounded-xl p-4 text-xs font-semibold">
        {/* Platform & Type Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Platform:</span>
          </div>
          <select
            value={activePlatform}
            onChange={(e) => updateFilter('platform', e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none focus:border-cyan-500"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-slate-400 ml-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Type:</span>
          </div>
          <select
            value={activeType}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none focus:border-cyan-500"
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Active Search Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <span>
          Showing <strong className="text-slate-200">{filteredProducts.length}</strong> products
        </span>
        {(activeCategory !== 'all' || activePlatform !== 'all' || activeType !== 'all' || searchQuery) && (
          <button
            onClick={() => setSearchParams({})}
            className="text-cyan-400 hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <p className="text-lg font-bold text-slate-200">No products match your filters</p>
          <p className="text-xs text-slate-500">
            Try resetting your search query, platform, or category selection.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
