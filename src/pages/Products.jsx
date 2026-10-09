import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, Gamepad2, AlertCircle } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('category') || 'all';
  const platformQuery = searchParams.get('platform') || 'all';
  const searchQueryParam = searchParams.get('search') || '';

  const [search, setSearch] = useState(searchQueryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [selectedPlatform, setSelectedPlatform] = useState(platformQuery);
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    if (searchParams.has('search')) setSearch(searchParams.get('search'));
    if (searchParams.has('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.has('platform')) setSelectedPlatform(searchParams.get('platform'));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchPlat = product.platform.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchPlat) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Platform
      if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
        return false;
      }

      // Type
      if (selectedType !== 'all' && product.type !== selectedType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sold') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0;
    });
  }, [products, search, selectedCategory, selectedPlatform, selectedType, sortBy]);

  const updateFilters = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const next = { ...current, ...newParams };

    Object.keys(next).forEach((key) => {
      if (!next[key] || next[key] === 'all') delete next[key];
    });

    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      {/* Top Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-cyan-400" />
            <span>Digital Store Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse paid games, game top-ups, gift cards, and subscriptions in Kurdistan & Iraq.
          </p>
        </div>

        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            updateFilters({ search: val });
          }}
          onClear={() => {
            setSearch('');
            updateFilters({ search: '' });
          }}
          className="w-full md:w-80"
        />
      </div>

      {/* Categories Bar */}
      <CategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          updateFilters({ category: catId });
        }}
      />

      {/* Secondary Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Platform Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value);
                updateFilters({ platform: e.target.value });
              }}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat.id} value={plat.id}>
                  {plat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="default">Featured / Default</option>
            <option value="sold">Most Sold</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="text-xs font-semibold text-slate-400 mb-4">
          Showing <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> products
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 rounded-2xl bg-slate-900/40 border border-slate-800 text-center flex flex-col items-center justify-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-600" />
            <h3 className="text-base font-bold text-slate-200">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Try clearing search terms or changing your platform/category filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSelectedType('all');
                setSearchParams({});
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-cyan-400 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
