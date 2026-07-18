import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';

export default function Products({ products, onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from search parameters
  const searchQuery = searchParams.get('search') || '';
  const selectedPlatform = searchParams.get('platform') || 'All';
  const selectedCategory = searchParams.get('category') || 'all';

  const [inputSearch, setInputSearch] = useState(searchQuery);

  // Sync state if URL search query changes
  useEffect(() => {
    setInputSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      if (inputSearch.trim()) {
        prev.set('search', inputSearch.trim());
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handlePlatformChange = (platform) => {
    setSearchParams((prev) => {
      if (platform === 'All') {
        prev.delete('platform');
      } else {
        prev.set('platform', platform);
      }
      return prev;
    });
  };

  const handleCategoryChange = (catId) => {
    setSearchParams((prev) => {
      if (catId === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', catId);
      }
      return prev;
    });
  };

  const handleClearFilters = () => {
    setInputSearch('');
    setSearchParams({});
  };

  // Filter computation
  const filteredProducts = products.filter((product) => {
    // 1. Search Query filter
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Platform filter
    const matchesPlatform =
      selectedPlatform === 'All' || product.platform === selectedPlatform;

    // 3. Category filter
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesPlatform && matchesCategory;
  });

  const platforms = ["All", "PC", "Xbox", "PlayStation", "Mobile", "Gift Card"];

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div className="border-b border-blue-500/10 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          DIGITAL CATALOG
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Explore and filter {products.length} elite gaming products and instant digital top-ups.
        </p>
      </div>

      {/* Filter and Control Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Filter Settings (Platform & Category Selectors) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-5 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
                Filter Options
              </span>
              {(searchQuery || selectedPlatform !== 'All' || selectedCategory !== 'all') && (
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>

            {/* Platform Filter */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Platform</span>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {platforms.map((plat) => {
                  const isActive = selectedPlatform === plat;
                  return (
                    <button
                      key={plat}
                      onClick={() => handlePlatformChange(plat)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow'
                          : 'bg-black/30 text-gray-400 hover:text-white hover:bg-black/50'
                      }`}
                    >
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Category</span>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                          : 'bg-black/30 text-gray-400 hover:text-white hover:bg-black/50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Search and Product Catalog Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Internal search field */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search by keyword, platform, game name..."
              className="w-full bg-[#0a0f1d]/50 text-sm text-gray-200 placeholder-gray-400 pl-11 pr-24 py-3 rounded-xl border border-blue-500/10 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-cyan-400" />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black uppercase text-white shadow hover:from-blue-500 hover:to-cyan-400 transition"
            >
              Search
            </button>
          </form>

          {/* Active status tags info */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-400 items-center">
            <span>Active filters:</span>
            <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 font-semibold text-gray-300">
              Platform: {selectedPlatform}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 font-semibold text-gray-300">
              Category: {categories.find(c => c.id === selectedCategory)?.name || 'All'}
            </span>
            {searchQuery && (
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 font-semibold text-gray-300">
                Query: "{searchQuery}"
              </span>
            )}
            <span className="ml-auto text-cyan-400 font-bold">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-blue-500/10 bg-[#0a0f1d]/20">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-950/20 text-cyan-400 border border-blue-500/10">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white">No Products Found</h3>
                <p className="text-xs text-gray-400">We couldn't find anything matching your filters or search query.</p>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/10"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
