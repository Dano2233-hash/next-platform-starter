import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, Gamepad2 } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [platform, setPlatform] = useState(initialPlatform);
  const [type, setType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (searchParams.get('search') !== null) setSearch(searchParams.get('search'));
    if (searchParams.get('category') !== null) setCategory(searchParams.get('category'));
    if (searchParams.get('platform') !== null) setPlatform(searchParams.get('platform'));
  }, [searchParams]);

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    // Search query check
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());

    // Category check
    const matchesCategory = category === 'all' || p.category === category;

    // Platform check
    const matchesPlatform = platform === 'all' || p.platform === platform;

    // Type check
    const matchesType = type === 'all' || p.type === type;

    return matchesSearch && matchesCategory && matchesPlatform && matchesType;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
    return 0; // default / featured
  });

  return (
    <div className="space-y-8">
      {/* Catalog Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1538] to-slate-900 border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Digital Games & Top-Ups Catalog</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Search and filter official game codes, gift cards, subscriptions, and mobile top-ups for players in Kurdistan & Iraq.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search product name, game title, or card..." />

        <CategoryTabs
          activeCategory={category}
          onSelectCategory={(catId) => {
            setCategory(catId);
            setSearchParams((prev) => {
              if (catId === 'all') prev.delete('category');
              else prev.set('category', catId);
              return prev;
            });
          }}
        />
      </div>

      {/* Secondary Controls: Platforms & Sorting */}
      <div className="bg-[#0c1021] border border-[#1a223e] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Platform:
          </span>
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPlatform(p.id);
                setSearchParams((prev) => {
                  if (p.id === 'all') prev.delete('platform');
                  else prev.set('platform', p.id);
                  return prev;
                });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                platform === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="featured">Featured First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Catalog Results Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#0c1021] border border-[#1a223e] rounded-3xl space-y-3">
          <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search filters or clearing search text.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
              setPlatform('all');
              setType('all');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
