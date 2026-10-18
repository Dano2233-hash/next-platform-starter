import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const queryParam = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activePlatform, setActivePlatform] = useState(platformParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setActivePlatform(searchParams.get('platform') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (cat, plat, search) => {
    const params = {};
    if (cat && cat !== 'all') params.category = cat;
    if (plat && plat !== 'all') params.platform = plat;
    if (search && search.trim()) params.search = search.trim();
    setSearchParams(params);
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    updateFilters(catId, activePlatform, searchQuery);
  };

  const handlePlatformSelect = (platId) => {
    setActivePlatform(platId);
    updateFilters(activeCategory, platId, searchQuery);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateFilters(activeCategory, activePlatform, val);
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setActivePlatform('all');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
      const matchPlatform = product.platform.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchPlatform) return false;
    }

    // Category match
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // Platform match
    if (activePlatform !== 'all' && product.platform !== activePlatform) {
      return false;
    }

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'sold') return b.soldCount - a.soldCount;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // default featured
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            All Store Products
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Browse paid games, mobile UC top-ups, gift cards, and subscriptions in IQD
          </p>
        </div>

        <div className="w-full md:w-72">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
            placeholder="Search by title, platform..."
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#0b0f1d] border border-slate-800 p-3 rounded-2xl">
        <CategoryTabs activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
      </div>

      {/* Platform Pills & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
        {/* Platforms */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isActive = activePlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-md font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500"
          >
            <option value="featured">Featured First</option>
            <option value="sold">Top Selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count & Clear Button */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-cyan-400 font-bold">{sortedProducts.length}</strong> products
        </span>

        {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
            <PackageX className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-slate-200 font-bold text-lg">No products found</h3>
          <p className="text-slate-400 text-xs mt-1 mb-6">
            We couldn't find any products matching your search criteria.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            Reset Filters
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
}
