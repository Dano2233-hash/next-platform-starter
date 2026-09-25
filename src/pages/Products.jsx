import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { categories, platforms, types } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const queryCategory = searchParams.get('category') || 'all';
  const querySearch = searchParams.get('search') || '';
  const queryFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceSort, setPriceSort] = useState('default');

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.get('search') !== null) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(q);
        const descMatch = product.description.toLowerCase().includes(q);
        const tagMatch = product.tag ? product.tag.toLowerCase().includes(q) : false;
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }

      // Special Filter
      if (queryFilter === 'flash' && !product.isFlashDeal) return false;
      if (queryFilter === 'top-sales' && (product.soldCount || 0) < 2000) return false;
      if (queryFilter === 'trending' && !product.isTrending) return false;
      if (queryFilter === 'top-rated' && !product.isTopRated) return false;

      // Category
      if (selectedCategory !== 'all') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // Platform
      if (selectedPlatform !== 'all') {
        if (product.platform.toLowerCase() !== selectedPlatform.toLowerCase()) return false;
      }

      // Type
      if (selectedType !== 'all') {
        if (product.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      }

      return true;
    }).sort((a, b) => {
      if (priceSort === 'low-to-high') return a.price - b.price;
      if (priceSort === 'high-to-low') return b.price - a.price;
      if (priceSort === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      if (priceSort === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [products, searchQuery, selectedCategory, queryFilter, selectedPlatform, selectedType, priceSort]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setPriceSort('default');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Store Products Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore instant digital game codes, mobile top-ups, gift cards, and legal subscriptions in IQD.
        </p>
      </div>

      {/* Controls & Search */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setSearchParams(prev => {
                  if (val) prev.set('search', val);
                  else prev.delete('search');
                  return prev;
                });
              }}
              onClear={() => {
                setSearchQuery('');
                setSearchParams(prev => {
                  prev.delete('search');
                  return prev;
                });
              }}
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="w-full bg-[#05070f] text-slate-200 text-xs rounded-xl pl-8 pr-4 py-3 border border-slate-800 focus:border-cyan-500 appearance-none font-semibold cursor-pointer"
              >
                <option value="default">Sort By: Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="popular">Most Popular / Sold</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
            </div>

            <button
              onClick={handleResetFilters}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setSearchParams(prev => {
                if (catId !== 'all') prev.set('category', catId);
                else prev.delete('category');
                return prev;
              });
            }}
          />
        </div>

        {/* Secondary Filters (Platform & Type) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filters:</span>
          </span>

          {/* Platform filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-slate-500 font-medium text-[11px] uppercase mr-1">Platform:</span>
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedPlatform === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              All
            </button>
            {platforms.map((plat) => (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-slate-500 font-medium text-[11px] uppercase mr-1">Type:</span>
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedType === 'all'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              All
            </button>
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                  selectedType === t.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-400">
            Showing <span className="text-slate-200 font-extrabold">{filteredProducts.length}</span> products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-600">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-slate-200 text-base">No products match your criteria</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Try searching for another keyword or reset active platform and category filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-xl"
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

    </div>
  );
}
