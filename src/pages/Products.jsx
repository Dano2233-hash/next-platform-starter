import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activePlatform, setActivePlatform] = useState(searchParams.get('platform') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state synced with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    const plat = searchParams.get('platform');
    const q = searchParams.get('search');
    if (cat) setActiveCategory(cat);
    if (plat) setActivePlatform(plat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') prev.delete('category');
      else prev.set('category', catId);
      return prev;
    });
  };

  const handlePlatformChange = (platId) => {
    setActivePlatform(platId);
    setSearchParams((prev) => {
      if (platId === 'all') prev.delete('platform');
      else prev.set('platform', platId);
      return prev;
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        // Platform Filter
        if (activePlatform !== 'all' && p.platform !== activePlatform) {
          return false;
        }
        // Search Filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description?.toLowerCase().includes(query);
          const matchTag = p.tag?.toLowerCase().includes(query);
          const matchType = p.type?.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchTag && !matchType) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default popular by soldCount
        return (b.soldCount || 0) - (a.soldCount || 0);
      });
  }, [products, activeCategory, activePlatform, searchQuery, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              All Digital Gaming Products
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Showing {filteredProducts.length} verified items in Kurdistan & Iraq store catalog
            </p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Categories Bar */}
        <div className="pt-2">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>
      </div>

      {/* Filter and Sorting Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#090e1a] border border-slate-800 p-4 rounded-xl">

        {/* Platform Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformChange(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activePlatform === plat.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 font-semibold rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any products matching your active filter criteria. Try resetting filters or searching for something else.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActivePlatform('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
