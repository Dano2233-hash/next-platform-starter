import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    const plat = searchParams.get('platform');
    const typ = searchParams.get('type');
    const q = searchParams.get('search');

    if (cat) setSelectedCategory(cat);
    if (plat) setSelectedPlatform(plat);
    if (typ) setSelectedType(typ);
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const updateFilters = (cat, plat, typ, q) => {
    const params = {};
    if (cat && cat !== 'all') params.category = cat;
    if (plat && plat !== 'all') params.platform = plat;
    if (typ && typ !== 'all') params.type = typ;
    if (q) params.search = q;
    setSearchParams(params);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    updateFilters(catId, selectedPlatform, selectedType, searchQuery);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    updateFilters(selectedCategory, platId, selectedType, searchQuery);
  };

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    updateFilters(selectedCategory, selectedPlatform, typeId, searchQuery);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    updateFilters(selectedCategory, selectedPlatform, selectedType, q);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
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
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchPlatform = product.platform.toLowerCase().includes(q);
      const matchType = product.type.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchPlatform && !matchType) {
        return false;
      }
    }
    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // featured default order
  });

  return (
    <div className="space-y-8 pb-16">

      {/* Page Header */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-sans">
              Digital Gaming Catalog
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Browse top-ups, game activation keys, gift cards, and digital memberships in Iraq.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              Showing {sortedProducts.length} Products
            </span>
            {(selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all' || searchQuery) && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 px-3 py-1.5 rounded-xl transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} placeholder="Search games, PUBG UC, Steam cards..." />

        {/* Category Tabs */}
        <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
      </div>

      {/* Filter Bar (Platform, Type, Sort) */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Filters:</span>
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => handlePlatformSelect(e.target.value)}
            className="bg-[#0d1424] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => handleTypeSelect(e.target.value)}
            className="bg-[#0d1424] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-bold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0d1424] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-bold text-cyan-400 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="featured">Featured / Default</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-[#080d19] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">No matching products found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try tweaking your search term, changing platform filters, or resetting filters.
            </p>
          </div>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
