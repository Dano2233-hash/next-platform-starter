import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export function ProductSection({ title, subtitle, icon, viewAllLink, products = [], onAddToCart, onBuyNow }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
}
