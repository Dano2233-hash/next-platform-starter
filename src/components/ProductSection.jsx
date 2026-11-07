import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export function ProductSection({
  title,
  subtitle,
  badge,
  viewAllLink,
  products = [],
  limit = 4,
}) {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (!displayedProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 border-b border-slate-800/60 last:border-b-0">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        badge={badge}
        viewAllLink={viewAllLink}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
