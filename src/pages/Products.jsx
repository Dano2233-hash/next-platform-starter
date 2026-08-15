import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs.jsx';
import SearchBar from '../components/SearchBar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Grid, SlidersHorizontal, PackageX } from 'lucide-react';

export default function Products({ products, onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'all';
    const p = searchParams.get('platform') || 'all';
    const t = searchParams.get('type') || 'all';

    setSearchQuery(s);
    setSelectedCategory(c);
    setSelectedPlatform(p);
    setSelectedType(t);
  }, [searchParams]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.search !== undefined) {
      if (newFilters.search) params.set('search', newFilters.search);
      else params.delete('search');
    }
    if (newFilters.category !== undefined) {
      if (newFilters.category !== 'all') params.set('category', newFilters.category);
      else params.delete('category');
    }
    if (newFilters.platform !== undefined) {
      if (newFilters.platform !== 'all') params.set('platform', newFilters.platform);
      else params.delete('platform');
    }
    if (newFilters.type !== undefined) {
      if (newFilters.type !== 'all') params.set('type', newFilters.type);
      else params.delete('type');
    }

    setSearchParams(params);
  };

  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const tagMatch = product.tag ? product.tag.toLowerCase().includes(q) : false;
      if (!nameMatch && !descMatch && !tagMatch) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Platform filter
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && product.type !== selectedType) {
      return false;
    }

    return true;
  });

  const resetAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-[#0a1024] to-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Grid className="w-6 h-6 text-cyan-400" /> Digital Gaming Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse genuine game keys, mobile top-ups, gift cards, and subscriptions in IQD.
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={(val) => updateFilters({ search: val })}
          onClear={() => updateFilters({ search: '' })}
        />
      </div>

      {/* Category Tabs & Sub-filters */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => updateFilters({ category: cat })}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={(plat) => updateFilters({ platform: plat })}
        selectedType={selectedType}
        onSelectType={(type) => updateFilters({ type: type })}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span>Showing {filteredProducts.length} Products</span>
        {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
          <button
            onClick={resetAllFilters}
            className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl py-16 px-4 text-center">
          <PackageX className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            We couldn't find any products matching your selected search criteria. Try clearing some filters.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-xl border border-slate-700"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
  );
}
