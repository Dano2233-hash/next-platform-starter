import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { PLATFORMS } from '../data/categories';
import { SlidersHorizontal, Grid, AlertCircle, RefreshCw } from 'lucide-react';

export const Products = ({ products, onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedPlatform, setSelectedPlatform] = useState(
    searchParams.get('platform') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL Search Params
  useEffect(() => {
    const cat = searchParams.get('category');
    const plat = searchParams.get('platform');
    const search = searchParams.get('search');

    if (cat) setSelectedCategory(cat);
    if (plat) setSelectedPlatform(plat);
    if (search !== null) setSearchQuery(search);
  }, [searchParams]);

  // Handle Category Select
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

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all' && item.platform !== selectedPlatform) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchType = item.type.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchType) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      // Popularity default
      return (b.soldCount || 0) - (a.soldCount || 0);
    });
  }, [products, selectedCategory, selectedPlatform, selectedType, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchQuery('');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#080d1a] border border-slate-800 p-6 rounded-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Product Catalog</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore digital games, mobile top-ups, gift cards, and legal subscriptions.
        </p>

        {/* Search Bar */}
        <div className="mt-4 max-w-xl">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Filters & Sorting Controls */}
      <div className="bg-[#090d18] border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Platform Filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setSelectedPlatform(plat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-400 font-bold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg text-slate-200 px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid Results */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products match your filter criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting your active category or search query to see all available products.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-bold inline-flex items-center gap-2 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 px-1 text-xs text-slate-400">
            <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
            <span>IQD Currency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
