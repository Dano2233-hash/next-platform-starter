import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Gamepad2 } from 'lucide-react';

export default function Products({ products, onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Filter logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Platform match
    if (selectedPlatform !== 'all') {
      const p = product.platform.toLowerCase();
      const targetP = selectedPlatform.toLowerCase();
      if (p !== targetP && !p.includes(targetP)) {
        return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const typeMatch = product.type.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);

      if (!nameMatch && !descMatch && !typeMatch && !categoryMatch) {
        return false;
      }
    }

    return true;
  });

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') newParams.delete('category');
    else newParams.set('category', catId);
    setSearchParams(newParams);
  };

  const handlePlatformChange = (platId) => {
    setSelectedPlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') newParams.delete('platform');
    else newParams.set('platform', platId);
    setSearchParams(newParams);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    const newParams = new URLSearchParams(searchParams);
    if (!q) newParams.delete('search');
    else newParams.set('search', q);
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-widest">
          <Gamepad2 className="w-4 h-4" />
          <span>Full Product Catalog</span>
        </div>
        <h1 className="text-3xl font-black text-white">Digital Store Catalog</h1>
        <p className="text-slate-400 text-sm">
          Browse official game keys, mobile top-ups, gift cards, and premium subscriptions available for direct delivery in Iraq.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

      {/* Search & Filter Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedPlatform={selectedPlatform}
        onPlatformChange={handlePlatformChange}
        onClearFilters={handleClearFilters}
      />

      {/* Product Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-2">
        <span>Showing {filteredProducts.length} items</span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
          <span className="text-cyan-400 font-bold">Filters Active</span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">No products found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              We couldn't find any products matching your search criteria. Try clearing filters or searching for something else.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
