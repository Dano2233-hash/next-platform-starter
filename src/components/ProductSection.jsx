import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  badge,
  badgeColor,
  actionLink,
  products = [],
  limit = 4,
  className = ''
}) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (displayProducts.length === 0) return null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge={badge}
          badgeColor={badgeColor}
          actionLink={actionLink}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
