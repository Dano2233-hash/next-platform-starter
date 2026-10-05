import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { PLATFORMS, TYPES } from '../data/categories';
import { SlidersHorizontal, PackageX } from 'lucide-react';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const platformParam = searchParams.get('platform') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Sync search state when URL query changes
  React.useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const handleSelectCategory = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') newParams.delete('category');
    else newParams.set('category', catId);
    setSearchParams(newParams);
  };

  const handleSelectPlatform = (pltId) => {
    const newParams = new URLSearchParams(searchParams);
    if (pltId === 'all') newParams.delete('platform');
    else newParams.set('platform', pltId);
    setSearchParams(newParams);
  };

  const handleSelectType = (typeId) => {
    const newParams = new URLSearchParams(searchParams);
    if (typeId === 'all') newParams.delete('type');
    else newParams.set('type', typeId);
    setSearchParams(newParams);
  };

  const handleSelectSort = (sortVal) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortVal === 'featured') newParams.delete('sort');
    else newParams.set('sort', sortVal);
    setSearchParams(newParams);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (categoryParam !== 'all' && p.category !== categoryParam) {
        // Also check platform matching for category tabs like xbox / playstation
        if (categoryParam === 'xbox' && p.platform !== 'Xbox') return false;
        if (categoryParam === 'playstation' && p.platform !== 'PlayStation') return false;
        if (categoryParam === 'mobile' && p.platform !== 'Mobile') return false;
        if (categoryParam === 'pc' && p.platform !== 'PC') return false;
        if (categoryParam === 'gift-cards' && p.category !== 'gift-cards' && p.type !== 'Gift Card') return false;
        if (categoryParam === 'subscriptions' && p.category !== 'subscriptions' && p.type !== 'Subscription') return false;
      }

      // Platform Filter
      if (platformParam !== 'all' && p.platform !== platformParam) {
        return false;
      }

      // Type Filter
      if (typeParam !== 'all' && p.type !== typeParam) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name ? p.name.toLowerCase().includes(q) : false;
        const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false;
        const matchCategory = p.category ? p.category.toLowerCase().includes(q) : false;
        const matchPlatform = p.platform ? p.platform.toLowerCase().includes(q) : false;
        return matchName || matchDesc || matchCategory || matchPlatform;
      }

      return true;
    }).sort((a, b) => {
      if (sortParam === 'price-low') return a.price - b.price;
      if (sortParam === 'price-high') return b.price - a.price;
      if (sortParam === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortParam === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // default featured order
    });
  }, [products, categoryParam, platformParam, typeParam, searchQuery, sortParam]);

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Category Tabs */}
      <div className="space-y-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            const newParams = new URLSearchParams(searchParams);
            if (!val.trim()) newParams.delete('search');
            else newParams.set('search', val);
            setSearchParams(newParams);
          }}
          placeholder="Search PUBG UC, Steam gift cards, GTA V, Valorant VP..."
        />

        <CategoryTabs
          activeCategory={categoryParam}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Secondary Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400 mr-1">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="uppercase tracking-wider font-bold">Filters:</span>
          </div>

          {/* Platform Filter */}
          <select
            value={platformParam}
            onChange={(e) => handleSelectPlatform(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeParam}
            onChange={(e) => handleSelectType(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="text-slate-400">Sort By:</span>
          <select
            value={sortParam}
            onChange={(e) => handleSelectSort(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-cyan-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="featured">Featured / Default</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <span>Showing <strong className="text-cyan-400 font-bold">{filteredProducts.length}</strong> products</span>
        {(categoryParam !== 'all' || platformParam !== 'all' || typeParam !== 'all' || searchQuery) && (
          <button
            onClick={() => setSearchParams({})}
            className="text-cyan-400 hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
          <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any products matching your selected search query or filters.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
