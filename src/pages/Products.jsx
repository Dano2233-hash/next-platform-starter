import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'all';
    const p = searchParams.get('platform') || 'all';
    setSearchQuery(s);
    setSelectedCategory(c);
    setSelectedPlatform(p);
  }, [searchParams]);

  const updateFilters = (newCat, newPlat, newSearch) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== 'all') params.set('category', newCat);
    if (newPlat && newPlat !== 'all') params.set('platform', newPlat);
    if (newSearch && newSearch.trim()) params.set('search', newSearch.trim());
    setSearchParams(params);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || p.platform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.soldCount || 0) - (a.soldCount || 0); // popular
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Digital Shop Catalog
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Explore game top-ups, paid Steam titles, gift card vouchers, and digital subscriptions.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex-1 max-w-lg">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                updateFilters(selectedCategory, selectedPlatform, val);
              }}
              onSubmit={(e) => e.preventDefault()}
              placeholder="Filter products..."
            />
          </div>

          <div className="flex items-center gap-3 justify-between md:justify-end">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0a0f20] text-slate-100 text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            updateFilters(catId, selectedPlatform, searchQuery);
          }}
        />

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-none">
          <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider shrink-0 pr-1">
            Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => {
                  setSelectedPlatform(plat.id);
                  updateFilters(selectedCategory, plat.id, searchQuery);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border-cyan-500/50'
                    : 'bg-[#060a17] text-slate-400 border-slate-800/80 hover:text-white'
                }`}
              >
                {plat.name}
              </button>
            );
          })}

          {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-slate-800/80 flex items-center gap-1 shrink-0 ml-auto"
            >
              <RefreshCw className="w-3 h-3" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#070b18] border border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
          <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-white">No products found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search terms, category selection, or platform filter.
          </p>
          <button
            onClick={clearFilters}
            className="mt-6 px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold text-xs hover:bg-cyan-500"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
