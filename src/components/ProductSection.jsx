import React from 'react';
import SectionHeader from './SectionHeader.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductSection({ title, subtitle, products, onAddToCart, onBuyNow, linkTo, limit }) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!displayProducts || displayProducts.length === 0) return null;

  return (
    <section className="py-8">
      <SectionHeader title={title} subtitle={subtitle} linkTo={linkTo} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
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
