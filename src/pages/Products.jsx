import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import { Filter, Gamepad2 } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleCategorySelect = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handlePlatformSelect = (platId) => {
    const params = new URLSearchParams(searchParams);
    if (platId === 'all') {
      params.delete('platform');
    } else {
      params.set('platform', platId);
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category Filter
      if (currentCategory !== 'all' && prod.category !== currentCategory) {
        return false;
      }
      // Platform Filter
      if (currentPlatform !== 'all' && prod.platform !== currentPlatform) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = prod.name.toLowerCase().includes(query);
        const descMatch = prod.description.toLowerCase().includes(query);
        const tagMatch = prod.tag ? prod.tag.toLowerCase().includes(query) : false;
        return nameMatch || descMatch || tagMatch;
      }
      return true;
    });
  }, [products, currentCategory, currentPlatform, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Digital Game Store Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Browse our entire library of digital game keys, top-up cash, gift card codes, and premium subscriptions available for Iraqi and Kurdish gaming enthusiasts.
        </p>

        <div className="pt-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search by game name, PUBG UC, Steam, PSN..."
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="space-y-3">
        <CategoryTabs
          activeCategory={currentCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Platform Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <span className="text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isActive = currentPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 border border-cyan-500 text-cyan-400 font-bold'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Results Grid */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4 px-1">
          <span>Showing {filteredProducts.length} Products</span>
          {(currentCategory !== 'all' || currentPlatform !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSearchParams({});
                setSearchQuery('');
              }}
              className="text-cyan-400 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <Gamepad2 className="w-12 h-12 text-slate-700 mx-auto" />
            <h3 className="text-base font-bold text-slate-200">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any items matching your search criteria. Try removing filters or searching for another title.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
