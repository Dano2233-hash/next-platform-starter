import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { Gamepad2, PackageX } from 'lucide-react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    const plat = searchParams.get('platform');
    const query = searchParams.get('search');

    if (cat) setCategory(cat);
    if (plat) setPlatform(plat);
    if (query) setSearch(query);
  }, [searchParams]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setSearchParams((prev) => {
      if (newCat === 'all') prev.delete('category');
      else prev.set('category', newCat);
      return prev;
    });
  };

  const handlePlatformChange = (newPlat) => {
    setPlatform(newPlat);
    setSearchParams((prev) => {
      if (newPlat === 'all') prev.delete('platform');
      else prev.set('platform', newPlat);
      return prev;
    });
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setSearchParams((prev) => {
      if (!val) prev.delete('search');
      else prev.set('search', val);
      return prev;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (category !== 'all' && item.category !== category) return false;

      // Platform filter
      if (platform !== 'all' && item.platform !== platform) return false;

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesPlatform = item.platform.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesType = item.type?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesPlatform && !matchesDesc && !matchesType) {
          return false;
        }
      }

      return true;
    });
  }, [products, category, platform, search]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'popular':
        return list.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      case 'rating':
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <Gamepad2 className="w-7 h-7 text-cyan-400" />
          <span>Product Catalog</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Browse our complete catalog of mobile game top-ups, paid PC games, digital gift cards, and subscriptions in Kurdistan & Iraq.
        </p>
      </div>

      {/* Filters & Search Header */}
      <div className="space-y-4 bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <CategoryTabs
          activeCategory={category}
          onSelectCategory={handleCategoryChange}
          activePlatform={platform}
          onSelectPlatform={handlePlatformChange}
        />
      </div>

      {/* Results Count Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>
          Showing <strong className="text-cyan-400">{sortedProducts.length}</strong> products
        </span>
        {(category !== 'all' || platform !== 'all' || search) && (
          <button
            onClick={() => {
              setCategory('all');
              setPlatform('all');
              setSearch('');
              setSearchParams({});
            }}
            className="text-slate-400 hover:text-cyan-400 transition underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#0a0e1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <PackageX className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
          <button
            onClick={() => {
              setCategory('all');
              setPlatform('all');
              setSearch('');
              setSearchParams({});
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};
