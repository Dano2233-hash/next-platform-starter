import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state filters
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedType, setSelectedType] = useState('all');

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search match
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Platform match
      if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
        return false;
      }

      // Type match
      if (selectedType !== 'all' && product.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedPlatform, selectedType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Digital Product Catalog</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore gaming top-ups, paid PC games, console passes, and gift cards with instant regional delivery.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">

        {/* Search Input */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">

          {/* Category Selector */}
          <div>
            <label className="block text-slate-400 mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#070b18] border border-slate-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Selector */}
          <div>
            <label className="block text-slate-400 mb-1.5">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#070b18] border border-slate-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat.id} value={plat.id}>
                  {plat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Selector */}
          <div>
            <label className="block text-slate-400 mb-1.5">Product Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#070b18] border border-slate-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800/60">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products
          </span>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-200">No products match your filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your selected category and platform filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
