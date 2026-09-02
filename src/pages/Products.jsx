import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, Gamepad2 } from 'lucide-react';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const activePlatformParam = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatformParam);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name?.toLowerCase().includes(query);
        const matchDesc = product.description?.toLowerCase().includes(query);
        const matchCategory = product.category?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }

      if (selectedCategory !== 'all') {
        if (product.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      if (selectedPlatform !== 'all') {
        if (product.platform?.toLowerCase() !== selectedPlatform.toLowerCase()) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.soldCount || 0) - (a.soldCount || 0);
    });
  }, [products, searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'all') params.delete('category');
    else params.set('category', category);
    setSearchParams(params);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    const params = new URLSearchParams(searchParams);
    if (platform === 'all') params.delete('platform');
    else params.set('platform', platform);
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <span>Store Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our complete collection of games, top-ups, gift cards, and subscriptions in IQD.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search catalog..."
          />
        </div>
      </div>

      <div className="space-y-4 bg-[#090e18] p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Category Filter
          </span>
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-slate-400 font-bold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformChange(plat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#0a0f1d] rounded-2xl border border-slate-800/80 space-y-3">
            <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing selected category and platform filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSearchParams({});
              }}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
    </div>
  );
}
