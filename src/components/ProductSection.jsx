import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export default function ProductSection({
  title,
  subtitle,
  products = [],
  linkUrl,
  linkText,
  icon,
  emptyMessage = 'No products available.'
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 border-b border-slate-850">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        linkUrl={linkUrl}
        linkText={linkText}
        icon={icon}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
