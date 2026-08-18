import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export function ProductSection({ title, subtitle, badge, products, onAddToCart, action }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <SectionHeader title={title} subtitle={subtitle} badge={badge} action={action} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
