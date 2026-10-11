import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Keep state in sync with URL search params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const typ = searchParams.get('type') || 'all';
    const q = searchParams.get('search') || '';

    setCategory(cat);
    setPlatform(plat);
    setType(typ);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    updateParams({ category: catId === 'all' ? null : catId });
  };

  const handlePlatformChange = (platId) => {
    setPlatform(platId);
    updateParams({ platform: platId === 'all' ? null : platId });
  };

  const handleTypeChange = (typeId) => {
    setType(typeId);
    updateParams({ type: typeId === 'all' ? null : typeId });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateParams({ search: val.trim() ? val : null });
  };

  const updateParams = (newObj) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newObj };
    const cleaned = {};
    Object.keys(merged).forEach((key) => {
      if (merged[key] && merged[key] !== 'all') {
        cleaned[key] = merged[key];
      }
    });
    setSearchParams(cleaned);
  };

  const resetFilters = () => {
    setCategory('all');
    setPlatform('all');
    setType('all');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (platform !== 'all' && p.platform?.toLowerCase() !== platform.toLowerCase()) return false;
    if (type !== 'all' && p.type?.toLowerCase() !== type.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      const matchTag = p.tag?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide">
            Digital Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our full range of games, top-ups, gift cards, and legal subscriptions.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
        />
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={category}
        onSelectCategory={handleCategoryChange}
      />

      {/* Secondary Filter Controls Bar */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mr-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filters:</span>
          </div>

          {/* Platform Dropdown */}
          <select
            value={platform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Type Dropdown */}
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {(category !== 'all' || platform !== 'all' || type !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 ml-2"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl py-16 text-center space-y-4">
          <Grid className="w-12 h-12 mx-auto text-slate-600" />
          <h3 className="font-heading font-bold text-lg text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any gaming item matching your active filters. Try clearing your search term or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold hover:bg-cyan-900/50"
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
