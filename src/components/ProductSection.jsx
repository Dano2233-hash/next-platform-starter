import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, viewAllLink, icon, products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <SectionHeader title={title} subtitle={subtitle} viewAllLink={viewAllLink} icon={icon} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
