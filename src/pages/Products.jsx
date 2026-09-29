import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { Gamepad2, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params
  const categoryParam = searchParams.get('category') || 'All';
  const platformParam = searchParams.get('platform') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('platform')) setSelectedPlatform(searchParams.get('platform'));
  }, [searchParams]);

  // Filter products based on category, platform, search
  const filteredProducts = products.filter((p) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    // Platform match
    const platformMatch =
      selectedPlatform === 'all' ||
      p.platform.toLowerCase() === selectedPlatform.toLowerCase();

    // Search query match
    const searchMatch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && platformMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.soldCount - a.soldCount; // popular
  });

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') newParams.delete('category');
    else newParams.set('category', cat);
    setSearchParams(newParams);
  };

  const handlePlatformChange = (plat) => {
    setSelectedPlatform(plat);
    const newParams = new URLSearchParams(searchParams);
    if (plat === 'all') newParams.delete('platform');
    else newParams.set('platform', plat);
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            Dano Store Products
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-cyan-400" />
            Digital Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse all game top-ups, paid Steam titles, gift cards, and premium subscriptions.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[280px]">
          <SearchBar placeholder="Filter products by title..." />
        </div>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-4 space-y-4">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformChange}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            Showing <span className="text-slate-100 font-bold">{sortedProducts.length}</span> products
            {searchQuery && <span>for "{searchQuery}"</span>}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#05070f] border border-slate-800 rounded-lg py-1 px-2.5 text-xs text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#090d1c] border border-slate-800 rounded-2xl space-y-3">
          <p className="text-base font-bold text-slate-300">No products matched your criteria</p>
          <p className="text-xs text-slate-500">Try clearing your category filter or search terms.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedPlatform('all');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-colors mt-2"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
