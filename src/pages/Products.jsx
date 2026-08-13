import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../data/categories';

export function Products({ products, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');

  // Synchronize state when SearchParams change
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      if (catId === 'all') prev.delete('category');
      else prev.set('category', catId);
      return prev;
    });
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    setSearchParams((prev) => {
      if (platform === 'all') prev.delete('platform');
      else prev.set('platform', platform);
      return prev;
    });
  };

  // Filter products matching category, platform & query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || p.platform.toLowerCase() === selectedPlatform.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.platform.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query);

    return matchesCategory && matchesPlatform && matchesQuery;
  });

  const platforms = ['all', 'PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card'];

  return (
    <div className="space-y-6 pb-16 text-left">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-white">Digital Catalog</h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Showing {filteredProducts.length} Premium items in Kurdistan region
        </p>
      </div>

      {/* Filter Row layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        {/* Sidebar Filters */}
        <div className="space-y-5 rounded-xl border border-[#12121e] bg-[#0c0c14] p-5">
          {/* Search bar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Search Title</label>
            <SearchBar value={searchQuery} onChange={(val) => {
              setSearchQuery(val);
              setSearchParams(prev => {
                if (val.trim() === '') prev.delete('search');
                else prev.set('search', val);
                return prev;
              });
            }} placeholder="Keyword search..." />
          </div>

          {/* Platform selection Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Target Platform</label>
            <div className="flex flex-col gap-1">
              {platforms.map((plat) => (
                <button
                  key={plat}
                  onClick={() => handlePlatformChange(plat)}
                  className={`rounded-lg px-3 py-2 text-left text-xs font-bold transition ${
                    selectedPlatform.toLowerCase() === plat.toLowerCase()
                      ? 'bg-[#0066ff] text-white'
                      : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {plat === 'all' ? 'All Platforms' : plat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Content area */}
        <div className="space-y-6 lg:col-span-3">

          {/* Category Tabs banner */}
          <CategoryTabs
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#1e1e2d] bg-[#08080f] py-16 text-center">
              <p className="text-sm text-gray-400 font-bold">No digital products match your filter parameters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                  handlePlatformChange('all');
                }}
                className="mt-3 rounded-lg bg-gradient-to-r from-[#0066ff] to-[#7000ff] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
