import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { Filter } from 'lucide-react';

export default function Products({ activePlatform, onProductSelect, navigate, initialSearchQuery, onSearchChange }) {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('All');

  // Handle passed props (like platform page selection)
  useEffect(() => {
    if (activePlatform) {
      setPlatformFilter(activePlatform);
    } else {
      setPlatformFilter('All');
    }
  }, [activePlatform]);

  const handleAddToCart = (product) => {
    if (product.packages && product.packages.length > 0) {
      onProductSelect(product);
      navigate(`/products/${product.slug}`);
    } else {
      addToCart(product, null, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    if (product.packages && product.packages.length > 0) {
      onProductSelect(product);
      navigate(`/products/${product.slug}`);
    } else {
      addToCart(product, null, 1);
      navigate('/checkout');
    }
  };

  const handleViewDetails = (product) => {
    onProductSelect(product);
    navigate(`/products/${product.slug}`);
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    // 1. Search Query
    const query = (initialSearchQuery || '').toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.platform.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query);

    // 2. Category Filter
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;

    // 3. Platform Filter
    const matchesPlatform = platformFilter === 'All' || p.platform.toLowerCase() === platformFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Header Banner */}
      <div className="bg-[#0b0c15] border border-white/5 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Store Catalog</h1>
          <p className="text-xs text-zinc-500 mt-1">Browse, search, and purchase digital gaming products instantly.</p>
        </div>

        {/* Live Search Bar */}
        <SearchBar value={initialSearchQuery || ''} onChange={onSearchChange} />
      </div>

      {/* Filter Tabs Row */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categories}
        />

        {/* Platform Quick Filter */}
        <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" />
            <span>Platform:</span>
          </div>
          {['All', 'PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card'].map((plat) => {
            const isPlatActive = platformFilter.toLowerCase() === plat.toLowerCase();
            return (
              <button
                key={plat}
                onClick={() => setPlatformFilter(plat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                  isPlatActive
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : 'bg-[#0d0d12] hover:bg-white/[0.03] border-white/5 text-zinc-400'
                }`}
              >
                {plat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Display Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-white/5 rounded-3xl bg-[#08080c] space-y-4">
          <p className="text-sm text-zinc-500">No products match your search or filters.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setPlatformFilter('All');
              onSearchChange('');
            }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
