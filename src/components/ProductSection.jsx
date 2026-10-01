import React from 'react';
import ProductCard from './ProductCard.jsx';
import SectionHeader from './SectionHeader.jsx';

export const ProductSection = ({
  title,
  subtitle,
  products = [],
  linkTo,
  linkText,
  icon
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        linkTo={linkTo}
        linkText={linkText}
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
