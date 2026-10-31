import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { SlidersHorizontal, Layers, X } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedPlatform = searchParams.get('platform') || 'all';
  const selectedFilter = searchParams.get('filter') || 'all';
  const selectedSort = searchParams.get('sort') || 'default';

  const [inStockOnly, setInStockOnly] = useState(false);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === '') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setInStockOnly(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search matching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description && product.description.toLowerCase().includes(query);
        const matchTag = product.tag && product.tag.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchTag) return false;
      }

      // Category matching
      if (selectedCategory !== 'all') {
        if (product.category !== selectedCategory) return false;
      }

      // Platform matching
      if (selectedPlatform !== 'all') {
        if (product.platform !== selectedPlatform) return false;
      }

      // Special highlight filters
      if (selectedFilter === 'flash' && !product.isFlashDeal) return false;
      if (selectedFilter === 'trending' && !product.isTrending) return false;
      if (selectedFilter === 'topRated' && !product.isTopRated) return false;
      if (selectedFilter === 'featured' && !product.isFeatured) return false;

      // Stock filter
      if (inStockOnly && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') {
        return (a.price || 0) - (b.price || 0);
      }
      if (selectedSort === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      if (selectedSort === 'sales') {
        return (b.soldCount || 0) - (a.soldCount || 0);
      }
      if (selectedSort === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0; // Default order
    });
  }, [products, searchQuery, selectedCategory, selectedPlatform, selectedFilter, inStockOnly, selectedSort]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedFilter !== 'all' || inStockOnly || selectedSort !== 'default';

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani',sans-serif] tracking-wider">
          Digital Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore all PC games, mobile top-ups, subscriptions, and gaming gift cards in Kurdistan & Iraq.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-6">
          <SearchBar
            value={searchQuery}
            onChange={(val) => updateParam('search', val)}
            onClear={() => updateParam('search', '')}
          />
        </div>

        <div className="lg:col-span-6 flex flex-wrap items-center gap-2.5 justify-start lg:justify-end">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => updateParam('category', e.target.value)}
            className="bg-[#0c1222] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name === 'All Categories' ? 'all' : cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Platform Dropdown */}
          <select
            value={selectedPlatform}
            onChange={(e) => updateParam('platform', e.target.value)}
            className="bg-[#0c1222] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="bg-[#0c1222] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="default">Sort: Default</option>
            <option value="sales">Top Sales</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* In Stock Toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              inStockOnly
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                : 'bg-[#0c1222] border-slate-700/80 text-slate-400 hover:text-white'
            }`}
          >
            In Stock Only
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 border border-red-800/40 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>
          Showing <strong className="text-white">{filteredProducts.length}</strong> items
        </span>
        {searchQuery && (
          <span className="text-cyan-400">
            Search results for: "{searchQuery}"
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No products match your criteria</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query, platform, or category filter to discover items.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-5 px-4 py-2 rounded-xl bg-cyan-600 text-slate-950 font-bold text-xs hover:bg-cyan-500 transition-colors"
          >
            Reset All Filters
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
