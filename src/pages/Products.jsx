import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const platform = searchParams.get('platform') || '';
    const search = searchParams.get('search') || '';

    if (platform) {
       // Platform is handled in filtering
    }
    setActiveCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  const platformFilter = searchParams.get('platform');
  const tagFilter = searchParams.get('filter');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesPlatform = !platformFilter || p.platform.toLowerCase() === platformFilter.toLowerCase() || p.platform.includes(platformFilter);
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTag = true;
    if (tagFilter === 'trending') matchesTag = p.isTrending;
    if (tagFilter === 'flash') matchesTag = p.isFlashDeal;
    if (tagFilter === 'featured') matchesTag = p.isFeatured;

    return matchesCategory && matchesPlatform && matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Store</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Explore our wide collection of digital products, from the latest games to top-ups for your favorite mobile apps.</p>
      </div>

      <div className="space-y-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
           <CategoryTabs
            activeCategory={activeCategory}
            onSelect={(cat) => {
              setActiveCategory(cat);
              setSearchParams(params => {
                if (cat === 'all') params.delete('category');
                else params.set('category', cat);
                return params;
              });
            }}
           />
           <div className="text-gray-400 text-sm">
             Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
           </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
             <div className="text-gray-500 mb-4">No products found matching your criteria.</div>
             <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSearchParams({});
              }}
              className="text-accent-cyan font-bold hover:underline"
             >
               Clear all filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
