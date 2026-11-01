import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'popular';

  const [typeFilter, setTypeFilter] = useState('all');

  const handleCategoryChange = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformChange = (platId) => {
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sortOption) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sortOption);
    setSearchParams(newParams);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }
      // Platform filter
      if (currentPlatform !== 'all' && product.platform !== currentPlatform) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'all' && product.type !== typeFilter) {
        return false;
      }
      // Search filter
      if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q);
        const matchesPlatform = product.platform?.toLowerCase().includes(q);
        const matchesPackages = product.packages?.some((pkg) =>
          pkg.name.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesDesc && !matchesPlatform && !matchesPackages) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (currentSort === 'popular') return b.soldCount - a.soldCount;
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'rating') return b.rating - a.rating;
      if (currentSort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, currentCategory, currentPlatform, typeFilter, currentSearch, currentSort]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#080d1a] border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Digital Store Catalog</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {filteredProducts.length} items
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse official digital codes, game keys, mobile top-ups, and subscriptions in Iraq & Kurdistan.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar initialQuery={currentSearch} onSearch={handleSearchChange} />
        </div>
      </div>

      {/* Filter Bars */}
      <div className="space-y-4">
        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                currentCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/40 shadow-sm'
                  : 'bg-[#090e1d] hover:bg-[#0f172a] text-slate-300 hover:text-white border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Platforms and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-850">
          {/* Platform chips */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformChange(plat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  currentPlatform === plat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-semibold text-slate-400">Sort by:</span>
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-[#090e1d] border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search keywords, platform filters, or category selection.
          </p>
          <button
            onClick={() => {
              setSearchParams(new URLSearchParams());
              setTypeFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600/30 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
