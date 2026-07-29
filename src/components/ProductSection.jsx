import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, products, onAddToCart, viewAllPath }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8">
      <SectionHeader title={title} subtitle={subtitle} viewAllPath={viewAllPath} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
