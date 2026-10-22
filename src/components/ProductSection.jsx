import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  badgeText,
  iconType,
  products = [],
  viewAllLink,
  maxItems = 8
}) => {
  const displayProducts = maxItems ? products.slice(0, maxItems) : products;

  if (displayProducts.length === 0) return null;

  return (
    <section className="mb-14">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        badgeText={badgeText}
        iconType={iconType}
        viewAllLink={viewAllLink}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
