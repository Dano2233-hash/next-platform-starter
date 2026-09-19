import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  badge,
  viewAllLink,
  products = [],
  limit = 4,
  className = ''
}) => {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (!displayedProducts || displayedProducts.length === 0) return null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
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
      </div>
    </section>
  );
};
