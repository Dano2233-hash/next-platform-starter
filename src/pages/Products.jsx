import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';

export function Products() {
  const { route, navigate } = useNavigation();
  const { products } = useProducts();
  const [sortOption, setSortOption] = useState('default');
  const [searchInputValue, setSearchInputValue] = useState('');

  // Extract query filters from Hash Router State
  const activeCategory = route.category; // e.g. others
  const activePlatform = route.platform; // e.g. xbox, playstation, pc, mobile, giftcard, subscription
  const searchKeyword = route.search || '';

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query matching (checks title, platform, type, description)
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.platform?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q)
      );
    }

    // Platform Filter
    if (activePlatform && activePlatform !== 'all') {
      result = result.filter(p => p.platform?.toLowerCase() === activePlatform.toLowerCase());
    }

    // Category Filter
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }

    // Sorting Logic
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'bestseller') {
      result.sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeCategory, activePlatform, searchKeyword, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let targetHash = '#/products';
    const params = [];

    if (searchInputValue.trim()) {
      params.push(`search=${encodeURIComponent(searchInputValue.trim())}`);
    }
    if (activeCategory) {
      params.push(`category=${activeCategory}`);
    }
    if (activePlatform) {
      params.push(`platform=${activePlatform}`);
    }

    if (params.length > 0) {
      targetHash += `?${params.join('&')}`;
    }
    navigate(targetHash);
  };

  const handleClearFilters = () => {
    setSearchInputValue('');
    navigate('#/products');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Banner Headers */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Browse Digital Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Select game top-ups, redeem codes, digital keys, and premium memberships with fast automated processing.
          </p>
        </div>

        {/* Category Tabs & Interactive Controls */}
        <div className="space-y-4">
          <CategoryTabs activeCategory={activeCategory} activePlatform={activePlatform} />

          {/* Search Inputs & Sorters */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#0d0d15] border border-brand-border/60">

            {/* Embedded Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex-grow max-w-lg relative">
              <input
                type="text"
                placeholder="Search matching products..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="w-full bg-[#050505] text-white border border-brand-border/60 rounded-lg pl-10 pr-20 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded"
              >
                Find
              </button>
            </form>

            {/* Filter indicators & Sorter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Reset filter badge */}
              {(activeCategory || activePlatform || searchKeyword) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/25 border border-red-500/20 px-3 py-2 rounded-lg transition"
                >
                  Clear All Filters
                </button>
              )}

              {/* Sorter Dropdown */}
              <div className="flex items-center gap-2 bg-[#050505] border border-brand-border/60 px-3 py-2 rounded-lg">
                <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-xs font-bold text-gray-300 outline-none cursor-pointer pr-1"
                >
                  <option value="default">Default Sort</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bestseller">Top Selling</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Filter Title Helper */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan">
          <SlidersHorizontal className="h-4 w-4" />
          <span>
            {activePlatform ? `${activePlatform} Products` : activeCategory ? `${activeCategory} Services` : 'All Products'}
            {searchKeyword ? ` matching "${searchKeyword}"` : ''}
          </span>
          <span className="text-gray-500">
            ({filteredProducts.length} items found)
          </span>
        </div>

        {/* Product Cards Grid section */}
        <div className="pb-10">
          <ProductSection products={filteredProducts} />
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Products;
