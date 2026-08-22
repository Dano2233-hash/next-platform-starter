import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  icon,
  badge,
  viewAllPath,
  products = [],
  emptyMessage = 'No products available in this section.',
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        badge={badge}
        viewAllPath={viewAllPath}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
