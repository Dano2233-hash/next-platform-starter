import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { Filter, Grid, PackageX } from 'lucide-react';

export default function Products() {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();

  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activePlatform, setActivePlatform] = useState(initialPlatform);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    if (searchParams.get('category')) setActiveCategory(searchParams.get('category'));
    if (searchParams.get('platform')) setActivePlatform(searchParams.get('platform'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
  }, [searchParams]);

  // Filter products based on search, category, and platform
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;

    const matchesPlatform =
      activePlatform === 'all' || product.platform === activePlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title Header */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6">
        <h1 className="font-heading text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
          <Grid className="w-6 h-6 text-cyan-400" />
          Digital Product Catalog
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore paid games, mobile top-ups, gift cards, and subscriptions. Instant delivery in Iraq.
        </p>

        {/* Search Bar inside Products page */}
        <div className="mt-4 max-w-xl">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Category & Platform Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
      />

      {/* Product Results Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
        <span>
          Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> products
        </span>
        {(activeCategory !== 'all' || activePlatform !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory('all');
              setActivePlatform('all');
              setSearchQuery('');
            }}
            className="text-xs text-cyan-400 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <PackageX className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="font-heading font-bold text-slate-200 text-base">No Products Found</h3>
          <p className="text-xs text-slate-500 max-w-md">
            We couldn't find any products matching your search query or selected filter criteria. Try adjusting your search term.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActivePlatform('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-500/20"
          >
            Reset Catalog View
          </button>
        </div>
      )}
    </div>
  );
}
