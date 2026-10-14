import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, RotateCcw, Gamepad2, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedType, setSelectedType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');

  // Keep state in sync with URL search params
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const updateUrlParams = (cat, plat, type, search) => {
    const params = {};
    if (cat && cat !== 'all') params.category = cat;
    if (plat && plat !== 'all') params.platform = plat;
    if (type && type !== 'all') params.type = type;
    if (search && search.trim()) params.search = search.trim();
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    updateUrlParams(catId, selectedPlatform, selectedType, searchQuery);
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    updateUrlParams(selectedCategory, platId, selectedType, searchQuery);
  };

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    updateUrlParams(selectedCategory, selectedPlatform, typeId, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateUrlParams(selectedCategory, selectedPlatform, selectedType, query);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
      // Flash deal filter from URL
      if (initialFilter === 'flash' && !product.isFlashDeal) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const tagMatch = product.tag ? product.tag.toLowerCase().includes(query) : false;
        if (!nameMatch && !descMatch && !tagMatch) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Default: popular
      return b.soldCount - a.soldCount;
    });
  }, [products, selectedCategory, selectedPlatform, selectedType, searchQuery, initialFilter, sortBy]);

  return (
    <div className="space-y-6 pb-12">

      {/* Header Title */}
      <div className="bg-[#0a0e1a] p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-cyan-400" />
            <span>Digital Store Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse official game keys, mobile reloads, gift cards, and subscriptions in Kurdistan & Iraq.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0a0e1a] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Search games, UC, VP, gift cards, subscriptions..."
        />

        {/* Category Tabs */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Categories
          </span>
          <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
        </div>

        {/* Platform & Type Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform:</span>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => handlePlatformChange(plat.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedPlatform === plat.id
                      ? 'bg-cyan-500 text-slate-950 font-extrabold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 ml-auto">
            <span>Type:</span>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTypeChange(t.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedType === t.id
                      ? 'bg-purple-500 text-white font-extrabold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {(selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-bold ml-2 px-2 py-1 rounded-lg bg-rose-950/40 border border-rose-500/30"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Pills */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
        {initialFilter === 'flash' && (
          <span className="text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30">
            Filtering Flash Deals
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0a0e1a] rounded-2xl border border-slate-800 p-12 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your filters to see available products.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
