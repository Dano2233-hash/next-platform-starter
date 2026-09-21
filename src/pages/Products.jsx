import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activePlatform, setActivePlatform] = useState(searchParams.get('platform') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setActivePlatform(plat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformChange = (platId) => {
    setActivePlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query.trim()) {
      newParams.delete('search');
    } else {
      newParams.set('search', query.trim());
    }
    setSearchParams(newParams);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    // Category match
    const matchCategory =
      activeCategory === 'all' || p.category === activeCategory;

    // Platform match
    const matchPlatform =
      activePlatform === 'all' || p.platform === activePlatform;

    // Search query match
    const matchSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.type && p.type.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchPlatform && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // Default popular
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Product Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore mobile top-ups, paid PC games, digital gift cards, and subscriptions in Kurdistan & Iraq.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="space-y-4">
        {/* Search & Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
              placeholder="Search games, UC, VP, gift cards..."
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative w-full">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500 appearance-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Category
          </p>
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Platform Buttons Filter */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform Filter</span>
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PLATFORMS.map((plat) => {
              const isActive = activePlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => handlePlatformChange(plat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                >
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300">
          <span>
            Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> products for
            {activeCategory !== 'all' && ` Category: ${activeCategory}`}
            {activePlatform !== 'all' && ` Platform: ${activePlatform}`}
            {searchQuery && ` Search: "${searchQuery}"`}
          </span>
          <button
            onClick={() => {
              handleCategoryChange('all');
              handlePlatformChange('all');
              handleSearchChange('');
            }}
            className="text-cyan-400 font-bold hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or clear category/platform filters to see available digital products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
