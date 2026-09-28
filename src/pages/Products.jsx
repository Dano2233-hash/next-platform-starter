import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS } from '../data/categories';
import { Filter, SlidersHorizontal, ShoppingBag } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleCategorySelect = (catId) => {
    const updated = new URLSearchParams(searchParams);
    if (catId === 'all') {
      updated.delete('category');
    } else {
      updated.set('category', catId);
    }
    setSearchParams(updated);
  };

  const handlePlatformSelect = (platId) => {
    const updated = new URLSearchParams(searchParams);
    if (platId === 'all') {
      updated.delete('platform');
    } else {
      updated.set('platform', platId);
    }
    setSearchParams(updated);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }
      // Platform Filter
      if (currentPlatform !== 'all' && p.platform !== currentPlatform) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchPlatform = p.platform?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchPlatform) {
          return false;
        }
      }
      return true;
    });
  }, [products, currentCategory, currentPlatform, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Digital Game Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showing {filteredProducts.length} results in Dano Store
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar onSearch={(q) => setSearchQuery(q)} />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Category Filter</h4>
          <CategoryTabs activeCategory={currentCategory} onSelectCategory={handleCategorySelect} />
        </div>

        {/* Platform Buttons */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Platform Filter</h4>
          <div className="flex flex-wrap items-center gap-2">
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  currentPlatform === plat.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#090d1a] rounded-3xl border border-slate-800">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-white">No products match your criteria</h3>
          <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => {
              setSearchParams({});
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
