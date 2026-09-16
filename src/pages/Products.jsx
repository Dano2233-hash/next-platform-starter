import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state in sync with URL search params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const cat = searchParams.get('category') || 'all';
    const plat = searchParams.get('platform') || 'all';
    const type = searchParams.get('type') || 'all';

    setSearchQuery(search);
    setSelectedCategory(cat);
    setSelectedPlatform(plat);
    setSelectedType(type);
  }, [searchParams]);

  // Update search params
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    updateParams('category', cat);
  };

  const handlePlatformSelect = (plat) => {
    setSelectedPlatform(plat);
    updateParams('platform', plat);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    updateParams('type', type);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateParams('search', val);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      if (product.platform.toLowerCase() !== selectedPlatform.toLowerCase()) {
        return false;
      }
    }

    // Type filter
    if (selectedType !== 'all') {
      if (product.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.soldCount || 0) - (a.soldCount || 0); // popular
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase">
          Product Store Catalog
        </h1>
        <p className="text-xs text-slate-400">
          Browse all official digital games, top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="space-y-4 bg-[#0d1322] p-4 rounded-2xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
              placeholder="Search by title, e.g. PUBG, Steam, GTA V..."
            />
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-semibold"
            >
              <option value="popular">Sort by Most Popular</option>
              <option value="price-low">Sort by Price: Low to High</option>
              <option value="price-high">Sort by Price: High to Low</option>
              <option value="rating">Sort by Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 border-t border-slate-800">
          <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
        </div>

        {/* Secondary Platform & Type filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Platform:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedPlatform === plat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 font-mono">
            Showing {sortedProducts.length} Products
          </span>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-[#0d1322] border border-slate-800 rounded-2xl">
            <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">No products match your filters</h3>
              <p className="text-xs text-slate-400 mt-1">Try resetting search query or changing category/platform filter.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSelectedType('all');
                setSearchParams(new URLSearchParams());
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
