import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export function Products({ products, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync state with URL search params
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');

    if (search !== null) setSearchTerm(search);
    if (category !== null) setSelectedCategory(category);
    if (platform !== null) setSelectedPlatform(platform);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') prev.delete('category');
      else prev.set('category', catId);
      return prev;
    });
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    setSearchParams((prev) => {
      if (platId === 'all') prev.delete('platform');
      else prev.set('platform', platId);
      return prev;
    });
  };

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    // Search match
    const matchSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Category match
    const matchCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    // Platform match
    const matchPlatform =
      selectedPlatform === 'all' ||
      p.platform.toLowerCase() === selectedPlatform.toLowerCase() ||
      (selectedPlatform === 'Multi-Platform' && p.platform === 'Multi-Platform');

    return matchSearch && matchCategory && matchPlatform;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Store Catalog</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse full inventory of digital games, top-ups, gift cards, and subscriptions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={(term) => {
              setSearchTerm(term);
              setSearchParams((prev) => {
                if (!term) prev.delete('search');
                else prev.set('search', term);
                return prev;
              });
            }}
            placeholder="Search game titles, gift cards, or top-ups..."
          />
        </div>

        {/* Category Tabs */}
        <div>
          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Categories
          </span>
          <CategoryTabs activeCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-800">
          {/* Platform Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs text-slate-400 font-bold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-slate-900/50 rounded-2xl p-12 text-center border border-slate-800 my-8">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No products found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any products matching your search criteria. Try adjusting filters or clearing search.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchParams({});
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
