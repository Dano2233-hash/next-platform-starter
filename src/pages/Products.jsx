import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialPlatform = searchParams.get('platform') || 'All';
  const initialFilter = searchParams.get('filter') || '';
  const initialSort = searchParams.get('sort') || 'recommended';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [sortBy, setSortBy] = useState(initialSort);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchPlatform = product.platform.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCategory && !matchPlatform) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory && selectedCategory !== 'All') {
          if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Platform Filter
        if (selectedPlatform && selectedPlatform !== 'All') {
          if (product.platform.toLowerCase() !== selectedPlatform.toLowerCase()) {
            return false;
          }
        }

        // URL Special filters
        if (initialFilter === 'flash' && !product.isFlashDeal) return false;
        if (initialFilter === 'trending' && !product.isTrending) return false;
        if (initialFilter === 'toprated' && !product.isTopRated) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        } else if (sortBy === 'price-high') {
          return b.price - a.price;
        } else if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'sales' || initialSort === 'sales') {
          return b.soldCount - a.soldCount;
        }
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedPlatform, sortBy, initialFilter, initialSort]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPlatform('All');
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Store Catalog
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Explore digital games, mobile top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Controls: Search, Category & Platform */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by game name, UC, gift card, platform..."
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Sort:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="recommended">Recommended</option>
              <option value="sales">Best Selling</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category & Platform Filter Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(plat) => setSelectedPlatform(plat)}
        />
      </div>

      {/* Active Filter Summary */}
      {(searchQuery || selectedCategory !== 'All' || selectedPlatform !== 'All') && (
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
          <div>
            Showing <span className="font-bold text-cyan-400">{filteredProducts.length}</span> products
            {selectedCategory !== 'All' && <span> in <strong className="text-white">{selectedCategory}</strong></span>}
            {selectedPlatform !== 'All' && <span> for <strong className="text-white">{selectedPlatform}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-white">{searchQuery}</strong>"</span>}
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Filter className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-bold">No products found matching your search</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
