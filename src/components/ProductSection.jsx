import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export default function ProductSection({ title, subtitle, icon, viewAllLink, badge, products = [], limit = 4 }) {
  if (!products || products.length === 0) return null;

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
        badge={badge}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
