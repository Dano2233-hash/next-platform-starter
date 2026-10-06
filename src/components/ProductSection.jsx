import React from 'react';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';

export const ProductSection = ({
  title,
  subtitle,
  icon,
  viewAllPath,
  badge,
  products = [],
  maxItems = 8
}) => {
  const displayedProducts = products.slice(0, maxItems);

  if (!displayedProducts || displayedProducts.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllPath={viewAllPath}
        badge={badge}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
