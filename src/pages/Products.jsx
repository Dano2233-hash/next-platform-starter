import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Gamepad2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';
import { useProducts } from '../hooks/useProducts';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state in sync with URL search params changes
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  // Handle category tab click
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  // Handle platform filter change
  const handleSelectPlatform = (platformId) => {
    setSelectedPlatform(platformId);
    const newParams = new URLSearchParams(searchParams);
    if (platformId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platformId);
    }
    setSearchParams(newParams);
  };

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const descMatch = p.description.toLowerCase().includes(q);
      const tagMatch = p.tag && p.tag.toLowerCase().includes(q);
      if (!nameMatch && !descMatch && !tagMatch) return false;
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      if (p.category !== selectedCategory) return false;
    }

    // Platform Filter
    if (selectedPlatform !== 'all') {
      if (p.platform.toLowerCase() !== selectedPlatform.toLowerCase()) return false;
    }

    // Type Filter
    if (selectedType !== 'all') {
      if (p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    }

    return true;
  });

  // Sorting products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // Default: Popularity / Sold count
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-12">

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4" /> Dano Digital Catalog
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
            Digital Games & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Browse official activation keys, mobile game top-ups, digital gift cards, and premium subscriptions available for instant manual delivery across Kurdistan & Iraq.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="space-y-4 bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl">

        {/* Top Search & Sort row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                const newParams = new URLSearchParams(searchParams);
                if (val) newParams.set('search', val);
                else newParams.delete('search');
                setSearchParams(newParams);
              }}
              onClear={() => {
                setSearchQuery('');
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('search');
                setSearchParams(newParams);
              }}
              placeholder="Search by title, keyword (e.g. PUBG, Steam, Netflix)..."
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 border-t border-slate-800">
          <CategoryTabs
            categories={CATEGORIES}
            activeCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Sub Filters: Platform & Type */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handleSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedPlatform.toLowerCase() === plat.id.toLowerCase()
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-400 hover:text-red-300 underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* RESULTS GRID / EMPTY STATE */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-semibold text-slate-400">
            Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> items
          </span>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No products match your filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try searching with a different term or clearing your category and platform filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Products;
