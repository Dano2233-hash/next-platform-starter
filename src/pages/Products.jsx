import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
  }, [searchParams]);

  const updateFilters = (cat, plat, query) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'all') params.set('category', cat);
    if (plat && plat !== 'all') params.set('platform', plat);
    if (query && query.trim()) params.set('search', query.trim());
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    updateFilters(cat, selectedPlatform, searchQuery);
  };

  const handlePlatformChange = (plat) => {
    setSelectedPlatform(plat);
    updateFilters(selectedCategory, plat, searchQuery);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    updateFilters(selectedCategory, selectedPlatform, q);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateFilters(selectedCategory, selectedPlatform, '');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter & Sort Products
  let filtered = products.filter((item) => {
    // Category match
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Platform match
    if (selectedPlatform !== 'all' && item.platform !== selectedPlatform) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const platformMatch = item.platform?.toLowerCase().includes(q);
      const categoryMatch = item.category?.toLowerCase().includes(q);
      return nameMatch || descMatch || platformMatch || categoryMatch;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    // Default: Popularity (soldCount)
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Store Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight">
              DIGITAL PRODUCTS & TOP-UPS
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Browse paid games, UC, Diamonds, V-Bucks, Gift Cards & Subscriptions.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#080d1a] text-white">Most Popular</option>
              <option value="price-low" className="bg-[#080d1a] text-white">Price: Low to High</option>
              <option value="price-high" className="bg-[#080d1a] text-white">Price: High to Low</option>
              <option value="rating" className="bg-[#080d1a] text-white">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="pt-2 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            placeholder="Search PUBG UC, Steam Games, Gift Cards..."
          />
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            selectedPlatform={selectedPlatform}
            onSelectPlatform={handlePlatformChange}
          />
        </div>
      </div>

      {/* Product Grid Results */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Showing <span className="text-cyan-400">{filtered.length}</span> Products
          </p>
          {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4 my-10">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
              <PackageX className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-xs text-slate-400 mt-1">
                We couldn't find any products matching your search criteria.
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
