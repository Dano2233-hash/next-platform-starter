import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL search params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    const p = searchParams.get('platform');
    const t = searchParams.get('type');
    if (s !== null) setSearchQuery(s);
    if (c !== null) setSelectedCategory(c);
    if (p !== null) setSelectedPlatform(p);
    if (t !== null) setSelectedType(t);
  }, [searchParams]);

  // Sync state back to URL params
  const handleCategoryChange = (catId) => {
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

  // Filter products algorithm
  const filteredProducts = products.filter((product) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchPlatform = product.platform?.toLowerCase().includes(q);
      const matchCategory = product.category?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchPlatform && !matchCategory) {
        return false;
      }
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

    // Filter shortcuts from URL parameters
    const filterParam = searchParams.get('filter');
    if (filterParam === 'flash' && !product.isFlashDeal && (!product.oldPrice || product.oldPrice <= product.price)) {
      return false;
    }
    if (filterParam === 'trending' && !product.isTrending) {
      return false;
    }
    if (filterParam === 'top-rated' && !product.isTopRated && product.rating < 4.8) {
      return false;
    }

    return true;
  });

  // Sort products algorithm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.soldCount - a.soldCount;
    return 0;
  });

  return (
    <div className="space-y-6 pb-16">

      {/* Page Title Header */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Digital Store <span className="text-cyan-400">Catalog</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Browse PUBG UC, Steam PC Games, PSN / Xbox Gift Cards, and Premium Subscriptions available for instant delivery in Kurdistan & Iraq.
        </p>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="flex-1 w-full">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-bold w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span className="whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-cyan-400 font-extrabold focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-slate-900 text-slate-100">Most Popular</option>
                <option value="price-low" className="bg-slate-900 text-slate-100">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900 text-slate-100">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-slate-100">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category & Platform Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformChange}
        />
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2">
        <span>Showing {sortedProducts.length} items</span>
        {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSearchParams({});
            }}
            className="text-cyan-400 hover:underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#0b0f19] border border-slate-800 rounded-3xl space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No products match your search</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or choosing a different platform.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;
