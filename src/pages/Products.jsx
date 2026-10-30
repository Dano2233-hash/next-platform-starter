import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { useProducts } from '../hooks/useProducts';
import { PLATFORMS } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSortBy(searchParams.get('sort') || 'default');
  }, [searchParams]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'default') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchPlatform = product.platform.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory && !matchPlatform) {
        return false;
      }
    }

    // Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Platform Filter
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // Default
  });

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || sortBy !== 'default';

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 space-y-6">
        {/* Header & Search Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
              Digital Catalog
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="default">Featured / Default</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#080c19] border border-slate-800 rounded-2xl p-4 space-y-4">
          {/* Category Tabs */}
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </span>
            <CategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => updateParam('category', catId)}
            />
          </div>

          {/* Platform Filters & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-2">Platform:</span>
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => updateParam('platform', platform.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {platform.name}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-[#080c19] border border-slate-800 rounded-3xl p-12 text-center my-8 max-w-md mx-auto">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">No Products Found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              We couldn't find any digital items matching your search or filter criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
