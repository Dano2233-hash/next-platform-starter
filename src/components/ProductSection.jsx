import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, tag, products = [], gridCols = "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" }) {
  if (products.length === 0) return null;

  return (
    <section className="py-8 border-b border-white/5 last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} tag={tag} />

        <div className={`grid ${gridCols} gap-4`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
