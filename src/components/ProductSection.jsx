import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  icon,
  badge,
  products = [],
  viewAllPath,
  limit = 4
}) => {
  if (!products || products.length === 0) return null;

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="mb-14">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        badge={badge}
        viewAllPath={viewAllPath}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
