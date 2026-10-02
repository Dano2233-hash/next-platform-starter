import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { SlidersHorizontal, PackageX } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedPlatform, setSelectedPlatform] = useState(
    searchParams.get('platform') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('q') || ''
  );
  const [sortBy, setSortBy] = useState('popular');

  // Sync state when URL search params change
  useEffect(() => {
    if (searchParams.has('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.has('platform')) {
      setSelectedPlatform(searchParams.get('platform'));
    }
    if (searchParams.has('q')) {
      setSearchQuery(searchParams.get('q'));
    }
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

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Platform filter
        if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchTag = p.tag?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        // Default: popular / soldCount
        return (b.soldCount || 0) - (a.soldCount || 0);
      });
  }, [products, selectedCategory, selectedPlatform, searchQuery, sortBy]);

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 font-heading tracking-tight">
            Store Catalog
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore {filteredProducts.length} digital games, top-ups, gift cards, and legal services.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Categories & Filter Controls */}
      <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Categories
          </span>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60">

          {/* Platforms Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
              Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs font-bold rounded-xl px-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 font-heading">
            No products match your criteria
          </h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or resetting filters to see more results.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchQuery('');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
