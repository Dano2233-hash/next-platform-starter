import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, AlertCircle } from 'lucide-react';

export default function Products({ products = [], onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activePlatform, setActivePlatform] = useState(initialPlatform);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setActivePlatform(searchParams.get('platform') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleCategoryChange = (catSlug) => {
    setActiveCategory(catSlug);
    const params = new URLSearchParams(searchParams);
    if (catSlug === 'all') params.delete('category');
    else params.set('category', catSlug);
    setSearchParams(params);
  };

  const handlePlatformChange = (platId) => {
    setActivePlatform(platId);
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') params.delete('platform');
    else params.set('platform', platId);
    setSearchParams(params);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (!query) params.delete('search');
    else params.set('search', query);
    setSearchParams(params);
  };

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }
    // Platform match
    if (activePlatform !== 'all' && p.platform?.toLowerCase() !== activePlatform?.toLowerCase()) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      const matchType = p.type?.toLowerCase().includes(q);
      const matchPackages = p.packages?.some((pkg) => pkg.name.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchType && !matchPackages) {
        return false;
      }
    }
    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.soldCount || 0) - (a.soldCount || 0); // default popular
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-[#0b1224] to-[#070b16] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Product Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Browse our complete catalog of digital games, mobile top-ups, gift cards, and premium subscriptions.
        </p>
      </div>

      {/* Controls Header */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div className="flex items-center justify-end gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-bold focus:border-cyan-500 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category & Platform Filter Bar */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
          activePlatform={activePlatform}
          onSelectPlatform={handlePlatformChange}
        />
      </div>

      {/* Product Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
        <span className="font-semibold text-slate-300">
          Showing <span className="text-cyan-400 font-bold">{sortedProducts.length}</span> products
        </span>
        {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSearchParams({});
              setActiveCategory('all');
              setActivePlatform('all');
              setSearchQuery('');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
          <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, selecting a different platform, or clearing filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
