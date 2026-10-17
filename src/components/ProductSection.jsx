import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, products, viewAllLink, icon }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <SectionHeader title={title} subtitle={subtitle} viewAllLink={viewAllLink} icon={icon} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
