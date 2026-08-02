import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { Search, SlidersHorizontal, Gamepad2, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PLATFORMS } from '../data/categories';

export default function Products() {
  const { products } = useProducts();

  // Read URL search/filter params
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const category = params.get('category');
    const platform = params.get('platform');

    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
    if (platform) setSelectedPlatform(platform);
  }, []);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || p.platform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const updateUrlParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === 'all' || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newPath = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newPath);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    updateUrlParam('category', catId);
  };

  const handleSelectPlatform = (platId) => {
    setSelectedPlatform(platId);
    updateUrlParam('platform', platId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    updateUrlParam('search', e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">

      {/* Page Title Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-black uppercase tracking-wider text-white">
          Our Game Catalog & Top-Ups
        </h1>
        <p className="text-sm text-gray-400">
          Browse our complete selection of paid game licenses, gift cards, subscriptions, and gaming packages.
        </p>
      </div>

      {/* Filter and Search Layout box */}
      <div className="bg-[#080811] border border-white/5 p-4 md:p-6 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Search */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Filter game name, coins, points..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#0d0d1a] border border-white/10 focus:border-cyan-500 text-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-500"
            />
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#111124] hover:bg-[#191936] border border-white/10 text-gray-300 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {showFilters ? '(Hide)' : '(Show)'}</span>
            </button>

            {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider px-3 py-2 bg-red-950/20 border border-red-900/40 rounded-xl transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Expandable Filters Grid */}
        {showFilters && (
          <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Platform Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => handleSelectPlatform(plat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                      selectedPlatform === plat.id
                        ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400'
                        : 'bg-[#0d0d1a] border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {plat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category selection description and details */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-950/40 border-purple-500 text-purple-400'
                        : 'bg-[#0d0d1a] border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Main Grid View */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">No matches found</h3>
            <p className="text-gray-400 text-xs mt-1">
              Try adjusting your search terms or selecting a different platform/category filter.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="bg-[#111124] hover:bg-[#1a1a36] border border-white/10 text-gray-200 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Showing {filteredProducts.length} Premium Products
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
