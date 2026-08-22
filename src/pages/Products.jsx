import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles, PackageX } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [sortBy, setSortBy] = useState('popular');

  // Keep state synced if URL search params change
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId);
    const newParams = new URLSearchParams(searchParams);
    if (platId === 'all') {
      newParams.delete('platform');
    } else {
      newParams.set('platform', platId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams);
    if (!term) {
      newParams.delete('search');
    } else {
      newParams.set('search', term);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const nameMatch = product.name.toLowerCase().includes(query);
          const descMatch = product.description.toLowerCase().includes(query);
          const catMatch = (product.category || '').toLowerCase().includes(query);
          const platMatch = (product.platform || '').toLowerCase().includes(query);
          if (!nameMatch && !descMatch && !catMatch && !platMatch) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (product.category !== selectedCategory) return false;
        }

        // Platform filter
        if (selectedPlatform !== 'all') {
          if ((product.platform || '').toLowerCase() !== selectedPlatform.toLowerCase()) return false;
        }

        // Special filter param (e.g. flash)
        if (initialFilter === 'flash') {
          if (!product.isFlashDeal) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.soldCount || 0) - (a.soldCount || 0); // popular default
      });
  }, [products, searchTerm, selectedCategory, selectedPlatform, initialFilter, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Page Banner Header */}
      <div className="bg-gradient-to-r from-[#0c1226] via-[#090e21] to-[#070b19] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Full Product Catalog</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          Explore All Digital Products
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Browse game top-ups, paid Steam keys, digital gift cards, and subscriptions. All products are delivered instantly via Player ID or Digital Codes.
        </p>

        {/* Search Bar */}
        <div className="pt-2">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
            placeholder="Search by game title, PUBG, Valorant, iTunes, Netflix..."
          />
        </div>
      </div>

      {/* Category & Platform Filter Controls */}
      <CategoryTabs
        activeCategory={selectedCategory}
        activePlatform={selectedPlatform}
        onSelectCategory={handleCategorySelect}
        onSelectPlatform={handlePlatformSelect}
      />

      {/* Grid Meta Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span>Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> Products</span>
          {(searchTerm || selectedCategory !== 'all' || selectedPlatform !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-cyan-400 hover:underline underline-offset-2 ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 self-end sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#090e21] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#090e21] border border-slate-800 rounded-3xl space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We couldn't find any items matching your current search or filter parameters. Try clearing your filters or searching for another keyword.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;
