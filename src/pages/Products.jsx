import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, X, Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { SearchBar } from '../components/SearchBar';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const searchParam = searchParams.get('search') || '';
  const saleParam = searchParams.get('sale') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedPlatform(platformParam);
    setSearchTerm(searchParam);
  }, [categoryParam, platformParam, searchParam]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformChange = (pltId) => {
    setSelectedPlatform(pltId);
    const newParams = new URLSearchParams(searchParams);
    if (pltId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', pltId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams);
    if (!term) {
      newParams.delete('search');
    } else {
      newParams.set('search', term);
    }
    setSearchParams(newParams);
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchTerm('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (selectedCategory !== 'all') {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        const catName = catObj ? catObj.name.toLowerCase() : selectedCategory.toLowerCase();
        const pCat = (p.category || '').toLowerCase();
        if (!pCat.includes(catName) && !selectedCategory.includes(pCat.replace(/\s+/g, '-'))) {
          // Additional fallback for slug vs name
          if (selectedCategory === 'pc-gaming' && p.platform !== 'PC' && p.category !== 'PC Gaming') return false;
          if (selectedCategory === 'xbox' && p.platform !== 'Xbox' && p.category !== 'Xbox') return false;
          if (selectedCategory === 'playstation' && p.platform !== 'PlayStation' && p.category !== 'PlayStation') return false;
          if (selectedCategory === 'mobile-top-ups' && p.platform !== 'Mobile' && p.category !== 'Mobile Top-Ups') return false;
          if (selectedCategory === 'gift-cards' && p.platform !== 'Gift Card' && p.category !== 'Gift Cards') return false;
          if (selectedCategory === 'subscriptions' && p.type !== 'Subscription' && p.category !== 'Subscriptions') return false;
        }
      }

      // Platform check
      if (selectedPlatform !== 'all') {
        if (p.platform !== selectedPlatform) return false;
      }

      // Search term check
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = (p.description || '').toLowerCase().includes(query);
        const matchCat = (p.category || '').toLowerCase().includes(query);
        const matchPlt = (p.platform || '').toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchPlt) return false;
      }

      // Flash sale check
      if (saleParam && !p.isFlashDeal && (!p.oldPrice || p.oldPrice <= p.price)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedPlatform, searchTerm, saleParam, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedPlatform !== 'all' || searchTerm || saleParam;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-[#090d1a] p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our wide selection of digital games, top-ups, gift cards, and subscriptions.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
            placeholder="Search catalog..."
          />
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Categories
              </label>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter List */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Platform
              </label>
              <div className="space-y-1">
                {PLATFORMS.map((plt) => (
                  <button
                    key={plt.id}
                    onClick={() => handlePlatformChange(plt.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedPlatform === plt.id
                        ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {plt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#090d1a] border border-slate-800 p-4 rounded-xl text-xs">
            <span className="text-slate-400">
              Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#05070f] border border-slate-800 text-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer font-semibold"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="sold">Most Sold</option>
              </select>
            </div>
          </div>

          {/* Grid or Empty */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No items matched your current filter criteria. Try adjusting your search query or reset filters.
              </p>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
