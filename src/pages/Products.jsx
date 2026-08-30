import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, LayoutGrid, AlertCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { platforms } from '../data/categories';

export default function Products({ products = [], onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all') {
      const catMatch = product.category === selectedCategory ||
        (selectedCategory === 'mobile' && product.platform === 'Mobile') ||
        (selectedCategory === 'pc' && product.platform === 'PC') ||
        (selectedCategory === 'playstation' && product.platform === 'PlayStation') ||
        (selectedCategory === 'xbox' && product.platform === 'Xbox') ||
        (selectedCategory === 'giftcards' && (product.category === 'giftcards' || product.platform === 'Gift Card')) ||
        (selectedCategory === 'subscriptions' && (product.category === 'subscriptions' || product.type === 'Subscription'));
      if (!catMatch) return false;
    }

    // Platform match
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
      return false;
    }

    // Type match
    if (selectedType !== 'all' && product.type !== selectedType) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const tagMatch = product.tag?.toLowerCase().includes(q);
      const pkgMatch = product.packages?.some(p => p.name.toLowerCase().includes(q));
      if (!nameMatch && !descMatch && !tagMatch && !pkgMatch) return false;
    }

    return true;
  });

  // Sort products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="space-y-8 pb-12">

      {/* Page Title & Search Header */}
      <div className="bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Product Catalog</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Browse All Digital Products
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Discover games, mobile UC/Diamonds, digital gift cards, and subscriptions with instant delivery.
          </p>

          <div className="pt-2">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
              placeholder="Search by game title, package name (e.g. 660 UC), or tag..."
            />
          </div>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div>
        <CategoryTabs
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Sub-Filters: Platform, Type, Sort & Reset */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">

        <div className="flex flex-wrap items-center gap-3">
          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-cyan-400"
            >
              {platforms.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Types</option>
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
            </select>
          </div>
        </div>

        {/* Right side Sort & Clear */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-cyan-400"
            >
              <option value="default">Featured / Default</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* Result Stats Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong>{sortedProducts.length}</strong> products</span>
        {searchQuery && (
          <span>Search results for &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
        )}
      </div>

      {/* Product Cards Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <AlertCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any items matching your selected criteria. Try adjusting your category or search query.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-400 shadow-md transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
