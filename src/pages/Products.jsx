import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gamepad2, SearchX } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activePlatform, setActivePlatform] = useState(searchParams.get('platform') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Sync state with URL query parameters
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'All';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setActivePlatform(plat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformSelect = (platId) => {
    setActivePlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'All') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category Filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      // Platform Filter
      if (activePlatform !== 'All' && prod.platform !== activePlatform) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = prod.name.toLowerCase().includes(q);
        const descMatch = prod.description ? prod.description.toLowerCase().includes(q) : false;
        const tagMatch = prod.tag ? prod.tag.toLowerCase().includes(q) : false;
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }
      return true;
    });
  }, [products, activeCategory, activePlatform, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#080d21] border border-slate-800/80 rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[11px] font-extrabold uppercase tracking-widest">
            Product Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Digital Games, Top-Ups & Gift Cards
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Browse our full range of gaming top-ups, paid Steam keys, console gift cards, and legal digital subscriptions for Kurdistan & Iraq.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        placeholder="Search by game name, UC, gift card..."
      />

      {/* Category Tabs & Platform Filters */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        activePlatform={activePlatform}
        onSelectPlatform={handlePlatformSelect}
      />

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#090d1a] border border-slate-800/80 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <SearchX className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No matching products found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search criteria, category tab, or platform filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActivePlatform('All');
              setSearchQuery('');
              setSearchParams(new URLSearchParams());
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
            <span>Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
