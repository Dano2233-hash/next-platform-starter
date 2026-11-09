import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export default function ProductSection({
  title,
  subtitle,
  tag,
  linkTo,
  icon,
  products = [],
  limit = 4
}) {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (displayedProducts.length === 0) return null;

  return (
    <section className="py-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        tag={tag}
        linkTo={linkTo}
        icon={icon}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
