import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Grid, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setSelectedPlatform(plat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category match
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // Platform match
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const catMatch = product.category.toLowerCase().includes(q);
      const platMatch = product.platform.toLowerCase().includes(q);
      if (!nameMatch && !descMatch && !catMatch && !platMatch) {
        return false;
      }
    }

    return true;
  });

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Store Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Browse All Digital Gaming Items
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Choose from games, UC, Diamonds, V-Bucks, Gift Cards, and Subscriptions. Delivered instantly in Kurdistan & Iraq.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Search & Platform Filter Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={handlePlatformSelect}
      />

      {/* Product Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing <span className="text-cyan-400 font-extrabold">{filteredProducts.length}</span> items
          </p>
          {(activeCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">No matching products found</h3>
              <p className="text-xs text-slate-400">
                Try adjusting your search criteria or clear active filters.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              Clear All Filters
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
    </div>
  );
}
