import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  badge,
  badgeColor,
  viewAllLink,
  products = [],
  limit = 4,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
}) {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (!displayedProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        badge={badge}
        badgeColor={badgeColor}
        viewAllLink={viewAllLink}
      />
      <div className={`grid ${columns} gap-4 sm:gap-6`}>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
