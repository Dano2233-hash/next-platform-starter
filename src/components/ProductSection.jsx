import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

export const ProductSection = ({ title, subtitle, icon, actionLink, actionText, products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        actionLink={actionLink}
        actionText={actionText}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
