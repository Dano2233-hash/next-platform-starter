import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { Filter, SlidersHorizontal, Layers } from 'lucide-react';

export function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'All';
  const urlPlatform = searchParams.get('platform') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(urlPlatform);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  // Keep state in sync if search params change
  React.useEffect(() => {
    if (searchParams.has('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.has('platform')) setSelectedPlatform(searchParams.get('platform'));
    if (searchParams.has('search')) setSearchQuery(searchParams.get('search'));
  }, [searchParams]);

  // Filter products based on search, category, platform
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'All' && p.platform !== selectedPlatform) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesPlatform = p.platform.toLowerCase().includes(query);
        const matchesDesc = p.description ? p.description.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesCategory && !matchesPlatform && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.soldCount - a.soldCount; // popular
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery, sortBy]);

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    setSearchParams((prev) => {
      if (catName === 'All') prev.delete('category');
      else prev.set('category', catName);
      return prev;
    });
  };

  const handleSelectPlatform = (platName) => {
    setSelectedPlatform(platName);
    setSearchParams((prev) => {
      if (platName === 'All') prev.delete('platform');
      else prev.set('platform', platName);
      return prev;
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Layers className="w-7 h-7 text-cyan-400" />
          <span>Product Catalog</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore all mobile top-ups, paid Steam keys, gift cards, and subscriptions.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4 bg-[#090d21] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setSearchParams((prev) => {
                  if (!val) prev.delete('search');
                  else prev.set('search', val);
                  return prev;
                });
              }}
              onClear={() => {
                setSearchQuery('');
                setSearchParams((prev) => {
                  prev.delete('search');
                  return prev;
                });
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 shrink-0 font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="popular">Most Popular / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category & Platform Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handleSelectPlatform}
        />
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400">
            Showing <span className="text-cyan-400 font-extrabold">{filteredProducts.length}</span> products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-200">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No game or top-up matches your current filter criteria. Try clearing search keywords or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPlatform('All');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
