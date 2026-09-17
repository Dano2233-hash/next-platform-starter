import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, icon, products, viewAllPath, badge, maxItems = 4 }) {
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, maxItems);

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllPath={viewAllPath}
        badge={badge}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
