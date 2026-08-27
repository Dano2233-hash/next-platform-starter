import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  linkTo,
  products = [],
  onAddToCart,
  onBuyNow
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader title={title} subtitle={subtitle} linkTo={linkTo} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
}
