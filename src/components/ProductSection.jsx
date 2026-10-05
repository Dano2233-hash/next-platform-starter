import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

const ProductSection = ({
  title,
  subtitle,
  icon,
  viewAllLink,
  tag,
  products = [],
  emptyMessage = 'No products available in this section.'
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        viewAllLink={viewAllLink}
        tag={tag}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
