import React from 'react';
import ProductCard from './ProductCard';

export function ProductSection({ products = [], limit }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-dashed border-brand-border/60 bg-[#0d0d15]/20">
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">No matching products found</p>
      </div>
    );
  }

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductSection;
