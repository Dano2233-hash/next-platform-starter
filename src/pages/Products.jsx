import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { useProducts } from '../hooks/useProducts';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state if URL search parameters change
  useEffect(() => {
    const querySearch = searchParams.get('search');
    const queryCat = searchParams.get('category');
    const queryPlat = searchParams.get('platform');

    if (querySearch !== null) setSearchTerm(querySearch);
    if (queryCat !== null) setSelectedCategory(queryCat);
    if (queryPlat !== null) setSelectedPlatform(queryPlat);
  }, [searchParams]);

  // Filter products based on criteria
  const filteredProducts = products.filter((p) => {
    // Search Term Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);
      const platMatch = p.platform.toLowerCase().includes(q);
      if (!nameMatch && !catMatch && !platMatch) return false;
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    // Platform Filter
    if (selectedPlatform !== 'all') {
      if (p.platform.toLowerCase() !== selectedPlatform.toLowerCase()) return false;
    }

    // Type Filter
    if (selectedType !== 'all') {
      if (p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // Default 'popular'
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full">

        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <span>Digital Store Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore games, top-up packages, gift cards, and legal subscriptions available in IQD.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchParams((prev) => {
              if (cat === 'all') prev.delete('category');
              else prev.set('category', cat);
              return prev;
            });
          }}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(plat) => {
            setSelectedPlatform(plat);
            setSearchParams((prev) => {
              if (plat === 'all') prev.delete('platform');
              else prev.set('platform', plat);
              return prev;
            });
          }}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        {/* Search & Sort Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/40 p-4 rounded-xl border border-slate-800">

          {/* Active Search & Count */}
          <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-bold text-slate-300">
            <span>Showing {sortedProducts.length} Products</span>
            {(searchTerm || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="ml-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-400"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4">
            <Filter className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No products match your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, platform, or category selection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-bold rounded-xl shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
