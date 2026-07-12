import React from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';

const ProductSection = ({ title, subtitle, link, products, className = "" }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} link={link} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
