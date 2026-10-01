import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { Gamepad2, FilterX } from 'lucide-react';

export const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);

  // Sync query params when URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPlatform(searchParams.get('platform') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch =
      selectedCategory.toLowerCase() === 'all' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    // Platform match
    const platformMatch =
      selectedPlatform.toLowerCase() === 'all' ||
      product.platform.toLowerCase() === selectedPlatform.toLowerCase();

    // Search query match (name, description, category, platform, tag)
    const query = searchQuery.trim().toLowerCase();
    const searchMatch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      (product.platform && product.platform.toLowerCase().includes(query)) ||
      (product.tag && product.tag.toLowerCase().includes(query));

    return categoryMatch && platformMatch && searchMatch;
  });

  const updateFilters = (newCat, newPlat, newSearch) => {
    const params = new URLSearchParams();
    if (newCat && newCat.toLowerCase() !== 'all') params.set('category', newCat);
    if (newPlat && newPlat.toLowerCase() !== 'all') params.set('platform', newPlat);
    if (newSearch && newSearch.trim()) params.set('search', newSearch.trim());
    setSearchParams(params);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    updateFilters(cat, selectedPlatform, searchQuery);
  };

  const handleSelectPlatform = (plat) => {
    setSelectedPlatform(plat);
    updateFilters(selectedCategory, plat, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateFilters(selectedCategory, selectedPlatform, query);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" /> Dano Store Catalog
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
          Digital Store Catalog ({filteredProducts.length} Products)
        </h1>
        <p className="text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed">
          Filter through games, top-ups, gift cards, and subscriptions. All items feature instant digital delivery and local Iraqi payment options.
        </p>

        {/* Live Search Bar */}
        <div className="pt-2 max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />
        </div>
      </div>

      {/* Category & Platform Filter Tabs */}
      <CategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        activePlatform={selectedPlatform}
        onSelectPlatform={handleSelectPlatform}
      />

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto text-gray-500">
            <FilterX className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search criteria or reset filters to view all products.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-cyan-500 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
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
