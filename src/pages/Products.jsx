import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { SlidersHorizontal, Trash2 } from 'lucide-react';

export function Products({ products = [], onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Handle URL search queries and categories
  useEffect(() => {
    const categoryQuery = searchParams.get('category');
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else {
      setSelectedCategory('all');
    }

    const searchQueryParam = searchParams.get('search');
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const handleCategorySelect = (categoryId) => {
    // Update local state and search params
    setSelectedCategory(categoryId);
    const updatedParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      updatedParams.delete('category');
    } else {
      updatedParams.set('category', categoryId);
    }
    setSearchParams(updatedParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchParams({});
  };

  // Unique list of platforms for filters
  const platforms = ['all', 'PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card', 'Subscriptions'];

  // Filter products dynamically
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesPlatform =
      selectedPlatform === 'all' ||
      product.platform.toLowerCase() === selectedPlatform.toLowerCase();

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Browse Digital Store
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore {filteredProducts.length} legal digital products and game codes for Kurdistan / Iraq gamers.
        </p>
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left side filters (Desktop) */}
        <div className="lg:col-span-1 space-y-6 bg-[#0a0a14] p-5 rounded-lg border border-slate-900 h-fit">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center space-x-2 text-white font-extrabold uppercase text-xs tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Filter Panel</span>
            </div>
            {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery !== '') && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-[10px] font-bold text-red-500 hover:text-red-400 uppercase transition-colors"
                title="Clear All Filters"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Input Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Keyword Search</label>
            <SearchBar value={searchQuery} onChange={(val) => setSearchQuery(val)} />
          </div>

          {/* Platform Filters */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Filter By Platform</label>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((plat) => {
                const isActive = selectedPlatform === plat;
                return (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlatform(plat)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border ${
                      isActive
                        ? 'bg-cyan-500 border-transparent text-black shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-slate-200'
                    }`}
                  >
                    {plat === 'all' ? 'All Platforms' : plat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side listing */}
        <div className="lg:col-span-3 space-y-6">
          {/* Category Tabs row */}
          <div className="bg-[#080810] border border-slate-900/80 p-3 rounded-lg">
            <CategoryTabs activeCategory={selectedCategory} onSelect={handleCategorySelect} />
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#0a0a14] border border-slate-900 rounded-lg p-12 text-center text-slate-500">
              <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 opacity-30 text-slate-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">
                No Products Found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No products match your filter search. Try resetting your search query or choosing another category.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                Reset Filter Settings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
