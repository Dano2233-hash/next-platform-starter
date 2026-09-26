import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, Search, RefreshCw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') prev.delete('category');
      else prev.set('category', catId);
      return prev;
    });
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedPlatform('All');
    setSelectedType('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory !== 'all') {
        const cat = (product.category || '').toLowerCase();
        const active = activeCategory.toLowerCase();
        if (cat !== active) {
          // Check platform fallback
          const plat = (product.platform || '').toLowerCase();
          if (!plat.includes(active)) return false;
        }
      }

      // Platform filter
      if (selectedPlatform !== 'All') {
        const plat = (product.platform || '').toLowerCase();
        if (!plat.includes(selectedPlatform.toLowerCase())) return false;
      }

      // Type filter
      if (selectedType !== 'All') {
        const type = (product.type || '').toLowerCase();
        if (type !== selectedType.toLowerCase()) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (product.name || '').toLowerCase().includes(q);
        const descMatch = (product.description || '').toLowerCase().includes(q);
        const catMatch = (product.category || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !catMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured/order
    });
  }, [products, activeCategory, selectedPlatform, selectedType, searchQuery, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Search Bar */}
      <div className="bg-[#070c1e] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 uppercase tracking-tight">
            Digital Game Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse Kurdistan and Iraq's complete inventory of PC games, top-ups, cards, and subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs">
            <span className="text-slate-400 font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0d142a] border border-slate-700 text-slate-100 text-xs rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-400"
            >
              <option value="featured">Featured / Default</option>
              <option value="sold">Most Popular (Sold)</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <CategoryTabs activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
      </div>

      {/* Filter Chips & Platform/Type Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#090e21] border border-slate-800 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold pr-2 border-r border-slate-800">
            <Filter className="w-4 h-4" />
            <span>Filters:</span>
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-[#0c1328] border border-slate-700 text-slate-200 py-1 px-2.5 rounded-lg focus:border-cyan-400"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#0c1328] border border-slate-700 text-slate-200 py-1 px-2.5 rounded-lg focus:border-cyan-400"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-bold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#070c1e] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <Grid className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products found matching your criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, changing the category, or clearing your active filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20"
          >
            Clear All Filters
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

export default Products;
