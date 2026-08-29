import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  icon,
  badgeText,
  viewAllLink,
  products = [],
  onAddToCart,
  onBuyNow,
  limit = 8,
}) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        badgeText={badgeText}
        viewAllLink={viewAllLink}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
