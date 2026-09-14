import React from 'react';
import SectionHeader from './SectionHeader.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductSection({ title, subtitle, icon, viewAllLink, products = [], limit = 4 }) {
  if (!products || products.length === 0) return null;

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
