import React from 'react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

export default function ProductSection({ title, subtitle, products = [], onAddToCart, onBuyNow, onViewDetails, onSeeAll, badge }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mb-12">
      <SectionHeader title={title} subtitle={subtitle} onSeeAll={onSeeAll} badge={badge} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
}
