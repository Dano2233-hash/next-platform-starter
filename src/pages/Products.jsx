import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialType = searchParams.get('type') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState('popular');

  // Sync state when URL search params change
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  // Update search query helper
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') newParams.delete('category');
    else newParams.set('category', catId);
    setSearchParams(newParams);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') newParams.delete('platform');
    else newParams.set('platform', platId);
    setSearchParams(newParams);
  };

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    const newParams = new URLSearchParams(searchParams);
    if (typeId === 'all') newParams.delete('type');
    else newParams.set('type', typeId);
    setSearchParams(newParams);
  };

  // Filter & Sort Products
  const filteredProducts = products.filter((product) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchPlat = product.platform.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchPlat) return false;
    }

    // Category match
    if (selectedCategory !== 'all') {
      if (product.category !== selectedCategory) return false;
    }

    // Platform match
    if (selectedPlatform !== 'all') {
      if (product.platform.toLowerCase() !== selectedPlatform.toLowerCase()) return false;
    }

    // Type match
    if (selectedType !== 'all') {
      if (product.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // default 'popular'
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            STORE <span className="text-cyan-400">CATALOG</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse paid games, digital top-ups, gift cards & instant subscriptions
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            const newParams = new URLSearchParams(searchParams);
            if (!val) newParams.delete('search');
            else newParams.set('search', val);
            setSearchParams(newParams);
          }}
          onClear={() => {
            setSearchQuery('');
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('search');
            setSearchParams(newParams);
          }}
        />
      </div>

      {/* Category Tabs */}
      <div>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Filter & Sort Control Bar */}
      <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">

        {/* Platform Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformSelect(plat.id)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedPlatform.toLowerCase() === plat.id.toLowerCase()
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort & Type dropdowns */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedType}
              onChange={(e) => handleTypeSelect(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Showing {filteredProducts.length} items</span>
        {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSelectedType('all');
              setSearchParams({});
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-[#090e1f] border border-slate-800 rounded-2xl p-8 space-y-3">
          <h3 className="font-orbitron font-bold text-slate-300 text-lg">No products found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find any products matching your search criteria. Try resetting filters or searching for something else.
          </p>
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
