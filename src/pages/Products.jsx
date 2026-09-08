import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Grid, Gamepad2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { categories, platforms } from '../data/categories';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params state
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentPlatform = searchParams.get('platform') || 'all';
  const currentFilter = searchParams.get('filter') || 'all';

  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handlePlatformChange = (platId) => {
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') {
      params.delete('platform');
    } else {
      params.set('platform', platId);
    }
    setSearchParams(params);
  };

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (currentSearch) {
        const query = currentSearch.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        const tagMatch = product.tag?.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }

      // 2. Category
      if (currentCategory !== 'all') {
        const catMatch = product.category === currentCategory ||
          (currentCategory === 'xbox' && product.platform === 'Xbox') ||
          (currentCategory === 'playstation' && product.platform === 'PlayStation') ||
          (currentCategory === 'pc' && product.platform === 'PC') ||
          (currentCategory === 'mobile' && product.platform === 'Mobile') ||
          (currentCategory === 'giftcards' && product.platform === 'Gift Card') ||
          (currentCategory === 'subscriptions' && product.platform === 'Service');
        if (!catMatch) return false;
      }

      // 3. Platform
      if (currentPlatform !== 'all') {
        if (product.platform !== currentPlatform) return false;
      }

      // 4. Special flags
      if (currentFilter === 'flash' && !product.isFlashDeal) return false;
      if (currentFilter === 'trending' && !product.isTrending) return false;
      if (currentFilter === 'toprated' && !product.isTopRated) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0); // popular default
    });
  }, [products, currentCategory, currentSearch, currentPlatform, currentFilter, sortBy]);

  return (
    <div className="space-y-8 pb-16">

      {/* Page Header */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Full Store Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Explore All Games, Top-Ups & Digital Cards
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Fast delivery with manual FastPay, Korek, and MasterCard options across Iraq & Kurdistan.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <section className="space-y-4">
        <CategoryTabs
          selectedCategory={currentCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090e1a] p-4 rounded-2xl border border-slate-800">

          {/* Search bar inside filter */}
          <div className="w-full sm:max-w-md">
            <SearchBar placeholder="Search by game name, code, or keyword..." />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Platform filter dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <select
                value={currentPlatform}
                onChange={(e) => handlePlatformChange(e.target.value)}
                className="bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id === 'all' ? 'all' : p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>
      </section>

      {/* Results Count & Active Search indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
        {currentSearch && (
          <span>
            Search results for: <strong className="text-cyan-400">"{currentSearch}"</strong>
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#080d1a] rounded-3xl border border-slate-800">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-white mb-1">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            We couldn't find any products matching your current search or category filter.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
