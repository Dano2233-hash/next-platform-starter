import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, Gamepad2 } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialType = searchParams.get('type') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedType, setSelectedType] = useState(initialType);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catSlug);
    }
    setSearchParams(newParams);
  };

  const handlePlatformChange = (platformName) => {
    setSelectedPlatform(platformName);
    const newParams = new URLSearchParams(searchParams);
    if (platformName === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platformName);
    }
    setSearchParams(newParams);
  };

  const handleTypeChange = (typeName) => {
    setSelectedType(typeName);
    const newParams = new URLSearchParams(searchParams);
    if (typeName === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', typeName);
    }
    setSearchParams(newParams);
  };

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesPlatform =
      selectedPlatform === 'all' || p.platform.toLowerCase() === selectedPlatform.toLowerCase();

    const matchesType =
      selectedType === 'all' || p.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesCategory && matchesPlatform && matchesType;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Gamepad2 className="w-7 h-7 text-cyan-400" /> All Digital Products
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Browse game top-ups, paid titles, gift cards, and subscriptions in IQD.
        </p>

        {/* Search & Main Category Tabs */}
        <div className="mt-6 space-y-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>
      </div>

      {/* Sub Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#080c16] border border-slate-800/80 rounded-2xl p-4 text-xs font-semibold">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => handlePlatformChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {TYPES.map((tp) => (
                <option key={tp.id} value={tp.id}>
                  {tp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-300">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching filters to view other digital products.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('all');
              handlePlatformChange('all');
              handleTypeChange('all');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl border border-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
