import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';

export default function Products({ products, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activePlatform, setActivePlatform] = useState('all');

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // List of platforms to filter
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'PC', name: 'PC' },
    { id: 'Xbox', name: 'Xbox' },
    { id: 'PlayStation', name: 'PlayStation' },
    { id: 'Mobile', name: 'Mobile' },
    { id: 'Gift Card', name: 'Gift Card' },
  ];

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', catId);
      }
      return prev;
    });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setSearchParams((prev) => {
      if (!val.trim()) {
        prev.delete('search');
      } else {
        prev.set('search', val);
      }
      return prev;
    });
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesPlatform = activePlatform === 'all' || p.platform === activePlatform;
    const matchesSearch = !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-xl font-black uppercase tracking-wider text-white">Digital Store Catalog</h1>
        <p className="text-xs text-white/50">Explore Kurdistan's largest directory of legal license keys, premium top-ups and memberships.</p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="bg-[#09090c] border border-white/5 p-6 rounded-xl space-y-4 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          {/* Search bar */}
          <div className="lg:col-span-2">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* Platform Dropdown */}
          <div className="flex flex-col">
            <select
              value={activePlatform}
              onChange={(e) => setActivePlatform(e.target.value)}
              className="bg-[#0d0d11] border border-white/5 text-white placeholder-white/40 text-xs rounded-lg px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              {platforms.map((plat) => (
                <option key={plat.id} value={plat.id}>
                  {plat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Row selection */}
        <div className="pt-2 border-t border-white/5">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>

      {/* Main Results Listing */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-white/50">
          <span>Showing <strong className="text-white">{filteredProducts.length}</strong> available options</span>
          {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setActivePlatform('all');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider text-[10px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#09090c] border border-white/5 rounded-xl space-y-4">
            <p className="text-sm text-white/40 font-semibold">No products found matching your active criteria.</p>
            <p className="text-xs text-white/30 max-w-xs mx-auto">Try refining your search terms or choosing a different category tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
