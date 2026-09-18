import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, Grid, SlidersHorizontal, RefreshCw, AlertCircle } from 'lucide-react';

export function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (newCat, newPlat, newSearch) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== 'all') params.set('category', newCat);
    if (newPlat && newPlat !== 'all') params.set('platform', newPlat);
    if (newSearch && newSearch.trim()) params.set('search', newSearch.trim());
    if (filterParam) params.set('filter', filterParam);
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    updateFilters(catId, selectedPlatform, searchQuery);
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    updateFilters(selectedCategory, platId, searchQuery);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    updateFilters(selectedCategory, selectedPlatform, q);
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
        return false;
      }
      // Flash deal filter
      if (filterParam === 'flash' && !p.isFlashDeal) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchPlatform = p.platform.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchType = p.type.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);

        if (!matchName && !matchPlatform && !matchCategory && !matchType && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery, filterParam]);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Grid className="w-3.5 h-3.5" />
            <span>Official Digital Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Game Store & Top-Up Catalog
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Browse paid games, digital currencies, gift vouchers, and subscriptions. All delivered instantly across Kurdistan & Iraq.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

          {/* Search Box */}
          <div className="md:col-span-6 lg:col-span-7">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
              placeholder="Search by game name, PUBG, VP, Robux, Gift Card..."
            />
          </div>

          {/* Platform Dropdown / Filter pills */}
          <div className="md:col-span-6 lg:col-span-5 flex items-center justify-between md:justify-end gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Platform:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {PLATFORMS.map((plat) => {
                const isActive = selectedPlatform === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => handlePlatformChange(plat.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {plat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-3 border-t border-slate-800/80">
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Active Filter Bar */}
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery || filterParam) && (
          <div className="flex items-center justify-between text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-md font-bold capitalize">
                  Category: {selectedCategory.replace('-', ' ')}
                </span>
              )}
              {selectedPlatform !== 'all' && (
                <span className="bg-blue-950 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-md font-bold">
                  Platform: {selectedPlatform}
                </span>
              )}
              {searchQuery && (
                <span className="bg-purple-950 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-md font-bold">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={handleClearAll}
              className="text-slate-400 hover:text-white flex items-center gap-1 font-bold transition-colors cursor-pointer ml-2 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Results Count Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
        <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
        <span className="text-cyan-400">IQD Currency Only</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <AlertCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No matching products found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any products matching your selected search or filter criteria. Try clearing filters or searching for something else.
          </p>
          <button
            onClick={handleClearAll}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Show All Products</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
