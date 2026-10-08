import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    const p = searchParams.get('platform');
    if (s !== null) setSearchQuery(s);
    if (c !== null) setSelectedCategory(c);
    if (p !== null) setSelectedPlatform(p);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') prev.delete('category');
      else prev.set('category', catId);
      return prev;
    });
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    setSearchParams((prev) => {
      if (platId === 'all') prev.delete('platform');
      else prev.set('platform', platId);
      return prev;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Platform match
      if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchPlatform = p.platform.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory && !matchPlatform) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">All Products</h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Explore games, top-ups, gift cards, and subscriptions. Instant delivery with FastPay, Korek, and MasterCard.
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Sort */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setSearchParams((prev) => {
                  if (!val.trim()) prev.delete('search');
                  else prev.set('search', val);
                  return prev;
                });
              }}
              onClear={() => {
                setSearchQuery('');
                setSearchParams((prev) => {
                  prev.delete('search');
                  return prev;
                });
              }}
              placeholder="Search games, UC, gift cards..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0b0f19] text-xs font-semibold text-slate-200 border border-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="default">Default</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category & Platform Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformChange}
        />
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <span>
          Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> products
        </span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchQuery('');
              setSearchParams({});
            }}
            className="text-cyan-400 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#0b0f19] border border-slate-800 rounded-2xl p-8">
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or switching categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
