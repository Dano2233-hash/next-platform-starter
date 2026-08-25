import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, ShieldAlert } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'rating'

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const q = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSelectedPlatform(plat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') params.delete('category');
    else params.set('category', catId);
    setSearchParams(params);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') params.delete('platform');
    else params.set('platform', platId);
    setSearchParams(params);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const params = new URLSearchParams(searchParams);
    if (!val) params.delete('search');
    else params.set('search', val);
    setSearchParams(params);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Platform match
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchCat = product.category?.toLowerCase().includes(q);
      const matchPlat = product.platform?.toLowerCase().includes(q);
      const matchPkg = product.packages?.some((p) => p.name.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCat && !matchPlat && !matchPkg) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // default 'popular' -> soldCount
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Digital Products Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore all original games, mobile top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#080d1a] p-4 rounded-2xl border border-slate-800">
        <div className="md:col-span-8">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            placeholder="Search by title, UC, diamonds, Steam card..."
          />
        </div>

        {/* Sort Select */}
        <div className="md:col-span-4 flex items-center gap-2 justify-end">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handlePlatformSelect}
      />

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> products
        </span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              handleClearSearch();
            }}
            className="text-cyan-400 hover:underline text-xs"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No items matched your current search filters. Try clearing your query or switching categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
