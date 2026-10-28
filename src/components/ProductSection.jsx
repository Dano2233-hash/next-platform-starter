import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export function ProductSection({ title, subtitle, products = [], linkTo, linkText }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader title={title} subtitle={subtitle} linkTo={linkTo} linkText={linkText} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
