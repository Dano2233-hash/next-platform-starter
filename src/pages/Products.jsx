import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync URL query params with state
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');

    if (search !== null) setSearchQuery(search);
    if (category !== null) setSelectedCategory(category);
    if (platform !== null) setSelectedPlatform(platform);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search matching
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Platform matching
    const matchesPlatform = selectedPlatform === 'all' || product.platform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getMinPrice = (p) => p.packages && p.packages.length > 0
      ? Math.min(...p.packages.map(pkg => pkg.price))
      : p.price;

    if (sortBy === 'price-low') {
      return getMinPrice(a) - getMinPrice(b);
    }
    if (sortBy === 'price-high') {
      return getMinPrice(b) - getMinPrice(a);
    }
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    // Default: Popular / Sold Count
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Digital Products Catalog
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Explore official games, mobile top-ups, gift cards, and premium subscriptions.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={(query) => {
            setSearchQuery(query);
            const newParams = new URLSearchParams(searchParams);
            if (query) newParams.set('search', query);
            else newParams.delete('search');
            setSearchParams(newParams);
          }}
        />

        {/* Category Tabs */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Categories
          </label>
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Platform Pills & Sort Row */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Platforms */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg py-1 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Active Filter Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> products</span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <p className="text-slate-300 font-bold text-base">No products match your current filters</p>
          <p className="text-slate-500 text-xs">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold text-xs hover:bg-cyan-500/20"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
