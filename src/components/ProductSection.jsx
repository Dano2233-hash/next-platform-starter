import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export function ProductSection({ title, subtitle, icon, linkTo, linkText, products = [], limit = 4 }) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="my-10 sm:my-14">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        linkTo={linkTo}
        linkText={linkText}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
