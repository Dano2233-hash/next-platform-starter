import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, Gamepad2, X } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSelectedPlatform(platformParam);
  }, [platformParam]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') params.delete('category');
    else params.set('category', catId);
    setSearchParams(params);
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') params.delete('platform');
    else params.set('platform', platId);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search check
      if (
        searchParam &&
        !product.name.toLowerCase().includes(searchParam.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchParam.toLowerCase())
      ) {
        return false;
      }

      // Category check
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Platform check
      if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
        return false;
      }

      return true;
    });
  }, [products, searchParam, selectedCategory, selectedPlatform]);

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <Gamepad2 className="w-7 h-7 text-cyan-400" />
          Product Catalog
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Search and filter all gaming products, top-up packages, digital gift cards, and subscriptions.
        </p>

        <div className="pt-2 max-w-lg">
          <SearchBar placeholder="Search by product name..." />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4">

        {/* Category Tabs */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Category</span>
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Platform Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformChange(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {plat.name}
            </button>
          ))}

          {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchParam) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 flex items-center gap-1 ml-auto"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try searching for something else or clearing your category and platform filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
