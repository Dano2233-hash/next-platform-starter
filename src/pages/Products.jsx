import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gamepad2, Filter, SlidersHorizontal, Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const cat = searchParams.get('category');
    const srch = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (srch !== null) setSearchTerm(srch);
  }, [searchParams]);

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    // Search match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      const matchCat = p.category?.toLowerCase().includes(q);
      const matchPlat = p.platform?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchPlat) return false;
    }

    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'xbox') {
        if (p.category !== 'xbox' && p.platform !== 'Xbox') return false;
      } else if (selectedCategory === 'playstation') {
        if (p.category !== 'playstation' && p.platform !== 'PlayStation') return false;
      } else if (selectedCategory === 'pc') {
        if (p.category !== 'pc' && p.platform !== 'PC') return false;
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }

    // Platform match
    if (selectedPlatform !== 'all') {
      if (p.platform !== selectedPlatform) return false;
    }

    // Type match
    if (selectedType !== 'all') {
      if (p.type !== selectedType) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      // popular
      return (b.soldCount || 0) - (a.soldCount || 0);
    }
  });

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (catId === 'all') {
        newParams.delete('category');
      } else {
        newParams.set('category', catId);
      }
      return newParams;
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a122e] to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-cyan-400" />
              <span>Digital Products Catalog</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Explore games, mobile top-ups, gift cards, and subscriptions for Kurdistan & Iraq gamers.
            </p>
          </div>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
        <CategoryTabs
          label="Category"
          options={CATEGORIES}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Platform</label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedPlatform === plat.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Item Type</label>
            <div className="flex flex-wrap gap-1.5">
              {PRODUCT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedType === type.id
                      ? 'bg-purple-500 text-white border-purple-400 font-extrabold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="popular">Most Popular / Sold</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
        <span>Showing {sortedProducts.length} Products</span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all' || searchTerm) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setSelectedType('all');
              setSearchTerm('');
              setSearchParams({});
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view all digital products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
