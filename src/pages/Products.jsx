import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { PLATFORMS } from '../data/categories';
import { Search, Filter, Grid, ShieldAlert } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentFilter = searchParams.get('filter') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(currentPlatform);

  // Filter products based on search, category, platform, and filter
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

      // Search query filter
      if (currentSearch) {
        const query = currentSearch.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description ? p.description.toLowerCase().includes(query) : false;
        const matchesType = p.type ? p.type.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesDesc && !matchesType) return false;
      }

      // Special Filter Types
      if (currentFilter === 'flash' && !p.isFlashDeal) return false;
      if (currentFilter === 'trending' && !p.isTrending) return false;
      if (currentFilter === 'top-rated' && !p.isTopRated) return false;

      return true;
    });
  }, [products, selectedCategory, selectedPlatform, currentSearch, currentFilter]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Digital Products & Top-Ups Catalog
        </h1>
        <p className="text-sm text-slate-400">
          Browse instant games, diamonds, UC, VP, gift cards, and subscriptions in Iraq.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Select Category
          </span>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Platform Buttons Strip */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Filter by Platform
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PLATFORMS.map((plat) => {
              const isActive = selectedPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => handlePlatformSelect(plat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-blue-900/60 border-cyan-400 text-cyan-300 shadow-md'
                      : 'bg-[#0a0f24] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Search / Filter Indicator */}
      {currentSearch && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            Search results for: <span className="font-bold text-cyan-400">"{currentSearch}"</span>
          </span>
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('search');
              setSearchParams(newParams);
            }}
            className="text-xs font-bold text-red-400 hover:text-red-300"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-[#0a0f24] border border-slate-800 rounded-2xl p-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
          >
            Reset All Filters
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
  );
}
