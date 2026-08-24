import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';

export default function Products({ products = [], onAddToCart, onBuyNow }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentPlatform = searchParams.get('platform') || 'all';
  const currentSearch = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('popular');

  const handleSelectCategory = (catSlug) => {
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catSlug);
    }
    setSearchParams(newParams);
  };

  const handleSelectPlatform = (platId) => {
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('search');
    } else {
      newParams.set('search', val);
    }
    setSearchParams(newParams);
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }
      // Platform filter
      if (currentPlatform !== 'all' && product.platform !== currentPlatform) {
        return false;
      }
      // Search filter
      if (currentSearch.trim()) {
        const query = currentSearch.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchTag = product.tag ? product.tag.toLowerCase().includes(query) : false;
        if (!matchName && !matchDesc && !matchTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.soldCount - a.soldCount; // popular
    });
  }, [products, currentCategory, currentPlatform, currentSearch, sortBy]);

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Digital Game & Top-Up Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse through our wide selection of games, diamonds, gift cards, and memberships.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-slate-400 font-semibold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs text-slate-100 font-bold focus:outline-none"
          >
            <option value="popular" className="bg-slate-900">Most Popular</option>
            <option value="rating" className="bg-slate-900">Highest Rated</option>
            <option value="price-low" className="bg-slate-900">Price: Low to High</option>
            <option value="price-high" className="bg-slate-900">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          value={currentSearch}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
        />

        <CategoryTabs
          selectedCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          selectedPlatform={currentPlatform}
          onSelectPlatform={handleSelectPlatform}
        />
      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
          <PackageSearch className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              handleSelectCategory('all');
              handleSelectPlatform('all');
              handleSearchChange('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-700 transition"
          >
            Clear Filters
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
  );
}
