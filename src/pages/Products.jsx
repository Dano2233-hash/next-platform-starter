import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Filter, SlidersHorizontal, Gamepad2 } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const activeCategory = searchParams.get('category') || 'all';
  const activePlatform = searchParams.get('platform') || 'all';
  const activeSearch = searchParams.get('search') || '';
  const activeFilter = searchParams.get('filter') || 'all';

  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Platform filter
      if (activePlatform !== 'all' && p.platform !== activePlatform) {
        return false;
      }

      // Filter tags (flash-deals, trending, top-rated)
      if (activeFilter === 'flash-deals' && !p.isFlashDeal) return false;
      if (activeFilter === 'trending' && !p.isTrending) return false;
      if (activeFilter === 'top-rated' && !p.isTopRated) return false;

      // Text search
      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const matchName = p.name?.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);
        const matchPlatform = p.platform?.toLowerCase().includes(query);
        const matchCategory = p.category?.toLowerCase().includes(query);
        const matchPackages = p.packages?.some((pkg) => pkg.name.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchPlatform && !matchCategory && !matchPackages) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      // Default: popular (sold count)
      return (b.soldCount || 0) - (a.soldCount || 0);
    });
  }, [products, activeCategory, activePlatform, activeSearch, activeFilter, sortBy]);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Gaming Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse top-ups, paid Steam games, gift cards, and legal digital services.
            </p>
          </div>

          <div className="w-full md:w-80">
            <SearchBar
              value={activeSearch}
              onChange={(val) => updateParam('search', val)}
              onClear={() => updateParam('search', '')}
              placeholder="Search by game or package..."
            />
          </div>
        </div>

        {/* Filter Badges & Sort Controls */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Platform Row Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Gamepad2 className="w-3.5 h-3.5" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => updateParam('platform', plat.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activePlatform === plat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count and Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-semibold text-slate-400">
            Showing <strong className="text-white">{filteredProducts.length}</strong> products
          </span>

          {(activeCategory !== 'all' || activePlatform !== 'all' || activeSearch || activeFilter !== 'all') && (
            <button
              onClick={() => setSearchParams({})}
              className="text-xs text-cyan-400 hover:underline font-bold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#090d1a] border border-slate-800 space-y-3">
            <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-bold text-white text-base">No gaming items match your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, clearing category filters, or browsing our full collection.
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
