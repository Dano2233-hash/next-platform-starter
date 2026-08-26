import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Gamepad2, Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const currentPlatform = searchParams.get('platform') || 'all';
  const [sortBy, setSortBy] = useState('popular');

  const platforms = ['all', 'PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesPlatform = product.platform.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesPlatform) {
          return false;
        }
      }

      // Category filter
      if (currentCategory !== 'all') {
        if (product.category !== currentCategory) return false;
      }

      // Platform filter
      if (currentPlatform !== 'all') {
        if (product.platform !== currentPlatform) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // Default popular
    });
  }, [products, searchQuery, currentCategory, currentPlatform, sortBy]);

  const handleCategorySelect = (categorySlug) => {
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categorySlug);
    }
    setSearchParams(newParams);
  };

  const handlePlatformSelect = (plat) => {
    const newParams = new URLSearchParams(searchParams);
    if (plat === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', plat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('search');
    } else {
      newParams.set('search', val);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0b1226] via-[#101936] to-[#180d2e] border border-cyan-500/20">
        <h1 className="text-2xl md:text-3xl font-black text-white">
          Digital Gaming Store Catalog
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl">
          Browse our complete catalog of instant game top-ups, paid Steam keys, gift cards, and subscriptions in IQD.
        </p>

        <div className="mt-6 max-w-md">
          <SearchBar
            placeholder="Search by title, platform or game..."
            onSearch={handleSearchChange}
          />
        </div>
      </div>

      {/* Filter Tabs & Platform Selection */}
      <div className="space-y-4 bg-[#090d18] p-4 rounded-2xl border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex-1 overflow-x-auto">
            <CategoryTabs
              activeCategory={currentCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#050811] border border-gray-800 text-xs font-semibold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="sold">Most Sold</option>
            </select>
          </div>
        </div>

        {/* Platform Pills Filter */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-800/80 overflow-x-auto">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {platforms.map(plat => (
            <button
              key={plat}
              onClick={() => handlePlatformSelect(plat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                currentPlatform === plat
                  ? 'bg-cyan-500 text-black font-extrabold shadow-md'
                  : 'bg-[#050811] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {plat === 'all' ? 'All Platforms' : plat}
            </button>
          ))}
        </div>
      </div>

      {/* Search results status */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>
          Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products
          {searchQuery && <span> for "<span className="text-white">{searchQuery}</span>"</span>}
        </span>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#090d18] border border-gray-800 space-y-3">
          <div className="w-16 h-16 rounded-full bg-gray-800/60 mx-auto flex items-center justify-center text-gray-500">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white">No products match your filters</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Try resetting your search query or selecting a different platform / category filter.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
