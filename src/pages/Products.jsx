import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { SlidersHorizontal, Layers, ArrowUpDown } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'All';
  const currentType = searchParams.get('type') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }
      // Platform filter
      if (currentPlatform !== 'All' && p.platform !== currentPlatform) {
        return false;
      }
      // Type filter
      if (currentType !== 'All' && p.type !== currentType) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = p.name?.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);
        const matchPlat = p.platform?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchPlat) {
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
  }, [products, currentCategory, currentPlatform, currentType, searchQuery, sortBy]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Digital Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse paid PC/console keys, mobile top-ups, and gift cards with instant delivery in Iraq.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={(val) => updateFilter('search', val)}
            onClear={() => updateFilter('search', '')}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div>
        <CategoryTabs
          selectedCategory={currentCategory}
          onSelectCategory={(catId) => updateFilter('category', catId)}
        />
      </div>

      {/* Secondary Platform & Type Filters bar */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
            <SlidersHorizontal size={14} />
            <span>Platform:</span>
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat}
              onClick={() => updateFilter('platform', plat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                currentPlatform === plat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown size={14} className="text-slate-400" />
          <span className="text-slate-400 font-semibold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(currentCategory !== 'all' || currentPlatform !== 'All' || searchQuery) && (
        <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <span>Active filters:</span>
          {currentCategory !== 'all' && (
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              Category: {currentCategory}
            </span>
          )}
          {currentPlatform !== 'All' && (
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              Platform: {currentPlatform}
            </span>
          )}
          {searchQuery && (
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              Search: "{searchQuery}"
            </span>
          )}
          <button
            onClick={() => setSearchParams({})}
            className="text-xs text-rose-400 hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-600">
            <Layers size={28} />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search terms or filters to find what you are looking for.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
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
