import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export const ProductSection = ({ title, subtitle, viewAllLink, icon, badgeText, products = [], limit }) => {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!displayProducts || displayProducts.length === 0) return null;

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllLink={viewAllLink}
        icon={icon}
        badgeText={badgeText}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
