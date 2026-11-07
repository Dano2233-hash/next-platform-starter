import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';

export function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const currentQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'featured';

  const [localSearch, setLocalSearch] = useState(currentQuery);

  const handleCategorySelect = (categorySlug) => {
    const params = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    setSearchParams(params);
  };

  const handlePlatformSelect = (platform) => {
    const params = new URLSearchParams(searchParams);
    if (platform === 'all') {
      params.delete('platform');
    } else {
      params.set('platform', platform);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    const params = new URLSearchParams(searchParams);
    if (val.trim()) {
      params.set('q', val.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const handleSortChange = (sortVal) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortVal);
    setSearchParams(params);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }

      // Platform filter
      if (currentPlatform !== 'all' && item.platform !== currentPlatform) {
        return false;
      }

      // Search query filter (matches name, description, tags, type)
      if (currentQuery.trim()) {
        const q = currentQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesTag = (item.tag || '').toLowerCase().includes(q);
        const matchesType = (item.type || '').toLowerCase().includes(q);
        const matchesPlatform = (item.platform || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesType && !matchesPlatform) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (currentSort === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, currentCategory, currentPlatform, currentQuery, currentSort]);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="pt-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span>Digital Games & Top-Up Catalog</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore authentic PC, Xbox, PlayStation games, mobile game recharges, and subscriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={currentCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Filter and Search Controls */}
      <div className="bg-[#0d1222] border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <SearchBar
              value={localSearch}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
              placeholder="Filter by title, platform or game..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 bg-[#05070f] border border-slate-700/80 px-3 py-2 rounded-xl text-xs text-slate-300 w-full sm:w-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <label htmlFor="sort-select" className="text-slate-400 whitespace-nowrap">Sort:</label>
              <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer w-full"
              >
                <option value="featured" className="bg-[#0d1222]">Featured</option>
                <option value="popular" className="bg-[#0d1222]">Most Popular</option>
                <option value="rating" className="bg-[#0d1222]">Highest Rated</option>
                <option value="price-low" className="bg-[#0d1222]">Price: Low to High</option>
                <option value="price-high" className="bg-[#0d1222]">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isSelected = currentPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors whitespace-nowrap border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-[#05070f] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
          {(currentCategory !== 'all' || currentPlatform !== 'all' || currentQuery) && (
            <button
              onClick={() => {
                setSearchParams({});
                setLocalSearch('');
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#0d1222] border border-slate-800 rounded-2xl p-8">
            <p className="text-slate-300 font-bold text-base mb-1">No products match your criteria</p>
            <p className="text-xs text-slate-500 mb-4">Try clearing your search keyword or switching category tabs.</p>
            <button
              onClick={() => {
                setSearchParams({});
                setLocalSearch('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              Reset Filters
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
    </div>
  );
}

export default Products;
