import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, icon, tag, viewAllLink, products = [], onAddToCart }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        tag={tag}
        viewAllLink={viewAllLink}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
