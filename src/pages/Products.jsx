import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function Products({ products, onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const platformParam = searchParams.get('platform') || 'all';
  const tagParam = searchParams.get('tag') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state synced with URL changes
  React.useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    setSelectedPlatform(searchParams.get('platform') || 'all');
  }, [searchParams]);

  const updateFilters = (newCat, newSearch, newPlat) => {
    const params = {};
    if (newCat && newCat !== 'all') params.category = newCat;
    if (newSearch && newSearch.trim()) params.search = newSearch.trim();
    if (newPlat && newPlat !== 'all') params.platform = newPlat;
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    updateFilters(catId, searchQuery, selectedPlatform);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateFilters(selectedCategory, query, selectedPlatform);
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    updateFilters(selectedCategory, searchQuery, platId);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSortBy('popular');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
          const matchPlat = product.platform.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchPlat) return false;
        }

        // Category
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Platform
        if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
          return false;
        }

        // Product Type
        if (selectedType !== 'all' && product.type !== selectedType) {
          return false;
        }

        // Tag filter (e.g. Flash Deal)
        if (tagParam && product.tag !== tagParam && !product.isFlashDeal) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default popular
        return (b.soldCount || 0) - (a.soldCount || 0);
      });
  }, [products, searchQuery, selectedCategory, selectedPlatform, selectedType, tagParam, sortBy]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Digital Store Catalog</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore official games, instant mobile top-ups, gift codes, and digital subscriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Controls Bar */}
      <div className="bg-[#090d16] p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full lg:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Platforms</option>
            {PLATFORMS.map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Item Types</option>
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Reset button */}
          {(selectedCategory !== 'all' || searchQuery || selectedPlatform !== 'all' || selectedType !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Result Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span>Showing {filteredProducts.length} results</span>
        {tagParam && (
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
            Filtered by: {tagParam}
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#090d16] rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <Filter className="w-12 h-12 text-slate-600" />
          <h3 className="text-lg font-bold text-white">No products match your criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Try adjusting your search query, clearing filters, or exploring a different gaming category.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
