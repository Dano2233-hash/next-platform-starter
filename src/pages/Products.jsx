import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';

export function Products({ products, onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';

  const [sortOption, setSortOption] = useState('popular');

  const updateSearch = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const updateCategory = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId && catId !== 'all') {
      params.set('category', catId);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const updatePlatform = (platId) => {
    const params = new URLSearchParams(searchParams);
    if (platId && platId !== 'all') {
      params.set('platform', platId);
    } else {
      params.delete('platform');
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      const matchesSearch = !searchParam ||
        p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchParam.toLowerCase()));

      // Category filter
      const matchesCategory = categoryParam === 'all' || p.category === categoryParam;

      // Platform filter
      const matchesPlatform = platformParam === 'all' || p.platform === platformParam;

      return matchesSearch && matchesCategory && matchesPlatform;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // popular default
    });
  }, [products, searchParam, categoryParam, platformParam, sortOption]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Product Store Catalog
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore digital games, top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <SearchBar value={searchParam} onChange={updateSearch} />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 font-medium">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div>
          <CategoryTabs activeCategory={categoryParam} onSelectCategory={updateCategory} />
        </div>

        {/* Platform Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform:</span>
          </span>

          {PLATFORMS.map((plat) => {
            const isActive = platformParam === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => updatePlatform(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-400">
            Showing <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <PackageSearch className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-200">No products match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, platform filter, or category selection.
            </p>
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
