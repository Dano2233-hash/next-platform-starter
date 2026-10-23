import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, icon, linkTo, products = [], limit = 8 }) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader title={title} subtitle={subtitle} icon={icon} linkTo={linkTo} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
