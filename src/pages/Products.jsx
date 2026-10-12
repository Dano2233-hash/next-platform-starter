import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const activePlatform = searchParams.get('platform') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('popular');

  const handleSelectCategory = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') params.delete('category');
    else params.set('category', catId);
    setSearchParams(params);
  };

  const handleSelectPlatform = (platId) => {
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') params.delete('platform');
    else params.set('platform', platId);
    setSearchParams(params);
  };

  const handleSearchChange = (q) => {
    const params = new URLSearchParams(searchParams);
    if (!q) params.delete('q');
    else params.set('q', q);
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (activePlatform !== 'all' && p.platform !== activePlatform) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTag = p.tag?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.soldCount || 0) - (a.soldCount || 0);
      });
  }, [products, activeCategory, activePlatform, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-100 tracking-tight">
          Product Catalog
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore all gaming top-ups, paid Steam games, gift cards, and subscriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Filters & Search Row */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

          <div className="lg:col-span-6">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* Platform Selector Buttons */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-between lg:justify-end gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 pr-2">
                <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
              </span>
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => handleSelectPlatform(plat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    activePlatform === plat.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-lg p-2 focus:outline-none focus:border-cyan-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any digital products matching your current category, platform, or search term.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-400 rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
