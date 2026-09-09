import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  icon,
  products = [],
  onAddToCart,
  linkTo,
  linkText,
  limit = 8,
}) => {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        linkTo={linkTo}
        linkText={linkText}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};
