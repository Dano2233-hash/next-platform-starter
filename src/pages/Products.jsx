import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL search params when changed externally
  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    setPlatform(searchParams.get('platform') || 'all');
    setType(searchParams.get('type') || 'all');
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (newCategory, newPlatform, newType, newSearch) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== 'all') params.set('category', newCategory);
    if (newPlatform && newPlatform !== 'all') params.set('platform', newPlatform);
    if (newType && newType !== 'all') params.set('type', newType);
    if (newSearch && newSearch.trim() !== '') params.set('search', newSearch.trim());
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    updateFilters(catId, platform, type, search);
  };

  const handlePlatformChange = (platId) => {
    setPlatform(platId);
    updateFilters(category, platId, type, search);
  };

  const handleTypeChange = (typeVal) => {
    setType(typeVal);
    updateFilters(category, platform, typeVal, search);
  };

  const handleSearchChange = (query) => {
    setSearch(query);
    updateFilters(category, platform, type, query);
  };

  // Filter products based on criteria
  const filteredProducts = products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (platform !== 'all' && p.platform !== platform) return false;
    if (type !== 'all' && p.type !== type) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchCategory = p.category?.toLowerCase().includes(q);
      const matchPlatform = p.platform?.toLowerCase().includes(q);
      const matchTag = p.tag?.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchPlatform && !matchTag) return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    return b.soldCount - a.soldCount; // popular default
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search */}
      <div className="space-y-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-100">
            Digital Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse paid games, mobile UC/diamonds top-ups, gift cards, and legal subscriptions.
          </p>
        </div>

        <SearchBar placeholder="Search games, gift cards, UC, diamonds..." onSearch={handleSearchChange} />
      </div>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={category} onSelectCategory={handleCategoryChange} />

      {/* Filter Toolbar (Platform, Type, Sort) */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Platform Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0 mr-2">
            <Filter size={14} className="text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformChange(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                platform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {plat.label}
            </button>
          ))}
        </div>

        {/* Sort & Type */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Game">Games Only</option>
            <option value="Top-Up">Top-Ups Only</option>
            <option value="Gift Card">Gift Cards Only</option>
            <option value="Subscription">Subscriptions Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(category !== 'all' || platform !== 'all' || type !== 'all' || search) && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold">Active filters:</span>
          {category !== 'all' && (
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Category: {category}
            </span>
          )}
          {platform !== 'all' && (
            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Platform: {platform}
            </span>
          )}
          {type !== 'all' && (
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Type: {type}
            </span>
          )}
          {search && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
              Search: "{search}"
            </span>
          )}
          <button
            onClick={() => updateFilters('all', 'all', 'all', '')}
            className="text-cyan-400 font-bold hover:underline ml-2"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            <PackageX size={32} />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or resetting active category & platform filters.
          </p>
          <button
            onClick={() => updateFilters('all', 'all', 'all', '')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
