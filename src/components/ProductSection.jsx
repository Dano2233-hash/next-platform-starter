import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, icon, viewAllHref, products, badge, limit = 4 }) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllHref={viewAllHref}
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
