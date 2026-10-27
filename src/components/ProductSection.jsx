import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

const ProductSection = ({ title, subtitle, products = [], viewAllPath, icon }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mb-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllPath={viewAllPath}
        icon={icon}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
