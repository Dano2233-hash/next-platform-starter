import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, Search, ArrowUpDown } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';

export default function Products() {
  const location = useLocation();
  const { products } = useProducts();

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';
  const initialSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const cat = queryParams.get('category');
    const srch = queryParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (srch) setSearchQuery(srch);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'pc-games' && p.category !== 'pc-games' && p.platform !== 'PC') return false;
        if (selectedCategory === 'xbox' && p.category !== 'xbox' && p.platform !== 'Xbox') return false;
        if (selectedCategory === 'playstation' && p.category !== 'playstation' && p.platform !== 'PlayStation') return false;
        if (selectedCategory === 'mobile' && p.category !== 'mobile' && p.platform !== 'Mobile') return false;
        if (selectedCategory === 'gift-cards' && p.category !== 'gift-cards' && p.platform !== 'Gift Card') return false;
        if (selectedCategory === 'subscriptions' && p.category !== 'subscriptions' && p.type !== 'Subscription') return false;
      }

      // Platform check
      if (selectedPlatform !== 'All' && p.platform !== selectedPlatform) {
        return false;
      }

      // Type check
      if (selectedType !== 'All' && p.type !== selectedType) {
        return false;
      }

      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesPlatform = p.platform.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesPlatform && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0;
    });
  }, [products, selectedCategory, selectedPlatform, selectedType, searchQuery, sortBy]);

  return (
    <div className="space-y-6 pb-16">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Digital Games &amp; Top-Ups Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse genuine PC games, mobile top-ups, gift cards, and subscriptions.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, platform, or top-up..."
          />
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Filters & Sorting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-semibold">

        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>{plat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <span>Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Sort */}
        <div className="flex items-center gap-2 text-slate-300">
          <ArrowUpDown className="w-4 h-4 text-blue-400" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-400 font-medium">
        Showing <span className="font-bold text-cyan-400">{filteredProducts.length}</span> products
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800 space-y-3">
          <Grid className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400">Try adjusting your category, platform filters, or search term.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('All');
              setSelectedType('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
