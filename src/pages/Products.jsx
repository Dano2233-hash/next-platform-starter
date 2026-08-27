import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val) {
      searchParams.set('search', val);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setSearchTerm('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'others') {
          const known = ['pc', 'xbox', 'playstation', 'mobile', 'gift-cards', 'subscriptions'];
          if (known.includes(product.category)) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Platform filter
      if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && product.type !== selectedType) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesPlatform = product.platform.toLowerCase().includes(query);
        const matchesPackages = product.packages?.some((p) =>
          p.name.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesPlatform && !matchesPackages) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'sold') return b.soldCount - a.soldCount;
      return 0; // default order
    });
  }, [products, selectedCategory, selectedPlatform, selectedType, searchTerm, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white mb-2">
          Digital Products & Top-Ups Catalog
        </h1>
        <p className="text-xs text-slate-400">
          Explore all official digital games, PUBG UC, Mobile Top-Ups, Steam Gift Cards, and Subscriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Filter and Search Bar Row */}
      <div className="bg-[#080d1a] border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="md:col-span-2">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </div>

          {/* Platform Filter */}
          <div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#0b101d] text-slate-200 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#0b101d] text-slate-200 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="featured">Sort by Featured</option>
              <option value="sold">Most Sold</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Type:
            </span>
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <button
            onClick={resetFilters}
            className="text-slate-400 hover:text-cyan-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredProducts.length} items</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm font-semibold mb-3">
            No products matched your search or filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
