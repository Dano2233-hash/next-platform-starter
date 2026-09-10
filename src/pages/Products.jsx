import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { PLATFORMS, TYPES } from '../data/categories';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Keep state in sync with URL search params
  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    setPlatform(searchParams.get('platform') || 'all');
    setType(searchParams.get('type') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter products catalog
  const filteredProducts = products.filter((item) => {
    if (category !== 'all' && item.category !== category) return false;
    if (platform !== 'all' && item.platform !== platform) return false;
    if (type !== 'all' && item.type !== type) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchPlat = item.platform.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchPlat) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Digital Products & Top-Ups Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Filter through our full range of games, top-ups, gift cards, and legal digital services for Kurdistan and Iraq.
        </p>

        {/* Category Tabs */}
        <div className="pt-2">
          <CategoryTabs
            selectedCategory={category}
            onSelectCategory={(catId) => updateFilters('category', catId)}
          />
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Options */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Search Catalog
              </label>
              <SearchBar
                value={searchQuery}
                onChange={(val) => updateFilters('search', val)}
                onClear={() => updateFilters('search', '')}
                placeholder="Search name, platform..."
              />
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Platform
              </label>
              <div className="space-y-1.5">
                {PLATFORMS.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => updateFilters('platform', plat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      platform === plat.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-slate-950/50 text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                    }`}
                  >
                    <span>{plat.name}</span>
                    {platform === plat.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Product Type
              </label>
              <div className="space-y-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateFilters('type', t.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      type === t.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-slate-950/50 text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                    }`}
                  >
                    <span>{t.name}</span>
                    {type === t.id && <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Cards Listing */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-800/80 text-xs text-slate-400">
            <span>
              Showing <strong className="text-slate-100">{filteredProducts.length}</strong> products
            </span>
            {(category !== 'all' || platform !== 'all' || type !== 'all' || searchQuery) && (
              <span className="text-cyan-400 font-semibold">Active Filters Applied</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No items match your current filter options. Try clearing filters or searching for something else.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
