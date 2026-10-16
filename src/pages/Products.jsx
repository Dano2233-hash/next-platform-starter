import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { CategoryTabs } from '../components/CategoryTabs.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { platforms } from '../data/categories.js';
import { Filter, Grid, SlidersHorizontal } from 'lucide-react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const platform = searchParams.get('platform') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSelectedPlatform(platform);
    setSearchQuery(search);
  }, [searchParams]);

  const updateFilters = (cat, plat, search) => {
    const params = {};
    if (cat && cat !== 'all') params.category = cat;
    if (plat && plat !== 'all') params.platform = plat;
    if (search && search.trim() !== '') params.search = search.trim();
    setSearchParams(params);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    updateFilters(catId, selectedPlatform, searchQuery);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    updateFilters(selectedCategory, platId, searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateFilters(selectedCategory, selectedPlatform, '');
  };

  // Filter pipeline
  let filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== 'all') {
      if (p.category !== selectedCategory) return false;
    }
    // Platform match
    if (selectedPlatform !== 'all') {
      if (p.platform !== selectedPlatform) return false;
    }
    // Search match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name ? p.name.toLowerCase().includes(q) : false;
      const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false;
      const matchTag = p.tag ? p.tag.toLowerCase().includes(q) : false;
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  // Sort pipeline
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore games, PUBG UC, gift cards, and premium subscriptions in Iraq
          </p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            updateFilters(selectedCategory, selectedPlatform, val);
          }}
          onClear={handleClearSearch}
        />

        {/* Category Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {platforms.map((plat) => (
            <button
              key={plat.id}
              onClick={() => handlePlatformSelect(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500 text-slate-950 font-extrabold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 text-xs font-bold text-slate-200 rounded-lg px-3 py-1.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Grid className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No items matched your search filters. Try resetting the category or platform selection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchQuery('');
              setSearchParams({});
            }}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
