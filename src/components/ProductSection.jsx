import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export function ProductSection({
  title,
  subtitle,
  viewAllLink,
  badgeText,
  icon,
  products = [],
  limit = 4
}) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllLink={viewAllLink}
        badgeText={badgeText}
        icon={icon}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
