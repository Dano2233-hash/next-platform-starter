import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export default function ProductSection({
  badge,
  title,
  subtitle,
  viewAllLink,
  viewAllText,
  products = [],
  emptyMessage = 'No products found.',
  className = '',
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className={`py-8 sm:py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
          viewAllLink={viewAllLink}
          viewAllText={viewAllText}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
