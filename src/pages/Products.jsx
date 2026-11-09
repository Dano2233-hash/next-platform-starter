import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  // URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSale = searchParams.get('sale') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [onlySale, setOnlySale] = useState(initialSale);

  // Sync state if url params change
  React.useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('platform')) setSelectedPlatform(searchParams.get('platform'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
    if (searchParams.get('sale') === 'true') setOnlySale(true);
  }, [searchParams]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all' && p.platform !== selectedPlatform && p.platform !== 'Multiplatform') {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesPlatform = p.platform.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesPlatform) {
          return false;
        }
      }
      // Only sale filter
      if (onlySale && !(p.oldPrice && p.oldPrice > p.price)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'sales') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery, onlySale, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setOnlySale(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading tracking-wide">
            EXPLORE CATALOG
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse authentic digital games, mobile top-ups, gift vouchers, and premium subscriptions.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              if (val) {
                setSearchParams({ search: val });
              } else {
                setSearchParams({});
              }
            }}
            placeholder="Search by game, top-up, card..."
          />
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setSearchParams(catId === 'all' ? {} : { category: catId });
          }}
        />
      </div>

      {/* Secondary Controls: Platform Filter, Sort & Deals */}
      <div className="p-4 rounded-2xl bg-[#090d1c] border border-white/5 flex flex-wrap items-center justify-between gap-4">

        {/* Platform Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setSelectedPlatform(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Sort & On Sale toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={onlySale}
              onChange={(e) => setOnlySale(e.target.checked)}
              className="rounded border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span className="font-semibold text-amber-400">Deals Only</span>
          </label>

          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/5 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured</option>
              <option value="sales" className="bg-slate-900">Top Sales</option>
              <option value="rating" className="bg-slate-900">Highest Rated</option>
              <option value="price-low" className="bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredProducts.length}</strong> products</span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery || onlySale) && (
          <button
            onClick={handleResetFilters}
            className="text-cyan-400 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#090d1c] border border-white/5 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">No Products Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            We couldn't find any products matching your active filters. Try searching for something else or reset your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950"
          >
            Clear Filters
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
  );
}
