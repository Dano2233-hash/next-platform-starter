import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL params on change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const q = searchParams.get('search') || '';
    setCategory(cat);
    setPlatform(plat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const newParams = new URLSearchParams(searchParams);
    if (newCat === 'all') newParams.delete('category');
    else newParams.set('category', newCat);
    setSearchParams(newParams);
  };

  const handlePlatformChange = (newPlat) => {
    setPlatform(newPlat);
    const newParams = new URLSearchParams(searchParams);
    if (newPlat === 'all') newParams.delete('platform');
    else newParams.set('platform', newPlat);
    setSearchParams(newParams);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (platform !== 'all' && p.platform !== platform) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTag = p.tag ? p.tag.toLowerCase().includes(q) : false;
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
    // Default 'popular'
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Digital Store Catalog</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {sortedProducts.length} Products
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore games, mobile top-ups, gift cards, and subscriptions
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            placeholder="Search by name, game, card..."
            onSearch={(val) => {
              setSearchQuery(val);
              const newParams = new URLSearchParams(searchParams);
              if (val) newParams.set('search', val);
              else newParams.delete('search');
              setSearchParams(newParams);
            }}
          />
        </div>
      </div>

      {/* Category Tabs & Filter Control */}
      <div className="space-y-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <CategoryTabs
          selectedCategory={category}
          onSelectCategory={handleCategoryChange}
          selectedPlatform={platform}
          onSelectPlatform={handlePlatformChange}
        />

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">
              Showing {sortedProducts.length} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="sold">Top Selling</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, platform filters, or category selection.
          </p>
          <button
            onClick={() => {
              setCategory('all');
              setPlatform('all');
              setSearchQuery('');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
