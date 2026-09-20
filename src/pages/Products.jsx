import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Gamepad2 } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export const Products = ({ products = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || 'all';
  const platformQuery = searchParams.get('platform') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [localSearch, setLocalSearch] = useState(searchParam);
  const [sortBy, setSortBy] = useState('featured');

  const handleCategoryChange = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformChange = (platId) => {
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('search', val);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category check
      if (categoryQuery !== 'all' && item.category !== categoryQuery) {
        return false;
      }
      // Platform check
      if (platformQuery !== 'all' && item.platform !== platformQuery) {
        return false;
      }
      // Search term check
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const tagMatch = item.tag?.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default / featured
    });
  }, [products, categoryQuery, platformQuery, localSearch, sortBy]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#091026] via-[#0d1738] to-[#120a2e] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-cyan-400" />
            Digital Product Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse through games, mobile top-ups, gift cards, and subscriptions available for Kurdistan & Iraq.
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#080d1a] p-4 rounded-2xl border border-slate-800">
        <SearchBar
          value={localSearch}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Search games, PUBG UC, gift cards..."
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            Sort By:
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0c1224] border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl p-2.5 outline-none focus:border-cyan-500"
          >
            <option value="featured">Featured / Default</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs & Platform Selection */}
      <CategoryTabs
        selectedCategory={categoryQuery}
        onSelectCategory={handleCategoryChange}
        selectedPlatform={platformQuery}
        onSelectPlatform={handlePlatformChange}
      />

      {/* Products Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
        <span>Showing {filteredProducts.length} results</span>
        {(categoryQuery !== 'all' || platformQuery !== 'all' || localSearch) && (
          <button
            onClick={() => {
              setSearchParams({});
              setLocalSearch('');
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Grid Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#080d1a] border border-slate-800/80 rounded-2xl space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No products found matching your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, platform selection, or category tab to explore our full store catalog.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
              setLocalSearch('');
            }}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl"
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
};

export default Products;
