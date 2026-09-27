import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  icon,
  products = [],
  viewAllLink,
  onAddToCart,
  onBuyNow,
  limit = 4
}) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
