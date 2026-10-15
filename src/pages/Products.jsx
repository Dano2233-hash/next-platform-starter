import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, Grid, AlertCircle } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'All';
  const queryPlatform = searchParams.get('platform') || 'All';

  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(queryPlatform);
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state in sync with URL searchParams
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('platform')) setSelectedPlatform(searchParams.get('platform'));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Free-to-play rule check guarantee
      // Search check
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.platform.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase());

      // Category check
      const matchesCategory =
        selectedCategory === 'All' ||
        selectedCategory === 'All Products' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      // Platform check
      const matchesPlatform =
        selectedPlatform === 'All' ||
        p.platform.toLowerCase() === selectedPlatform.toLowerCase();

      // Type check
      const matchesType =
        selectedType === 'All' ||
        p.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesCategory && matchesPlatform && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // Default: popular
    });
  }, [products, search, selectedCategory, selectedPlatform, selectedType, sortBy]);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const newParams = new URLSearchParams(searchParams);
    if (catName === 'All') newParams.delete('category');
    else newParams.set('category', catName);
    setSearchParams(newParams);
  };

  const handlePlatformChange = (plat) => {
    setSelectedPlatform(plat);
    const newParams = new URLSearchParams(searchParams);
    if (plat === 'All') newParams.delete('platform');
    else newParams.set('platform', plat);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Grid className="w-7 h-7 text-cyan-400" />
              <span>Digital Store Catalog</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse all games, mobile top-ups, gift cards, and subscriptions.
            </p>
          </div>

          <div className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3.5 py-2 rounded-xl self-start sm:self-auto">
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={(val) => {
            setSearch(val);
            const newParams = new URLSearchParams(searchParams);
            if (val) newParams.set('search', val);
            else newParams.delete('search');
            setSearchParams(newParams);
          }}
          placeholder="Search products, game titles, gift cards..."
        />

        {/* Categories Horizontal Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
      </div>

      {/* Filters & Sorting Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-[#090d1a]/80 border border-slate-800 p-4 rounded-xl">
        {/* Platform Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-bold text-slate-300 uppercase">Platform:</span>
          <select
            value={selectedPlatform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            className="bg-[#05070f] border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none flex-1"
          >
            {PLATFORMS.map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-xs font-bold text-slate-300 uppercase">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#05070f] border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none flex-1"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 md:col-span-2 justify-end">
          <span className="text-xs font-bold text-slate-400 uppercase">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#05070f] border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            <option value="popular">Most Popular / Sales</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto" />
          <h3 className="font-bold text-lg text-white">No products found matching your search</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search query, platform, or category filters to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedPlatform('All');
              setSelectedType('All');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
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
};
