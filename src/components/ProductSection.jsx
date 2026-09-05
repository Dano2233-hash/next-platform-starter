import React from 'react';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';

export const ProductSection = ({ title, subtitle, icon, viewAllLink, badge, products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
        badge={badge}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
