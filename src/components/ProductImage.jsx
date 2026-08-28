import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

export function ProductImage({ product, height = 'h-48' }) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if image src changes
  useEffect(() => {
    setHasError(false);
  }, [product?.image, product?.id]);

  if (!product || !product.image || hasError) {
    return (
      <ProductVisual
        name={product?.name || 'Digital Item'}
        category={product?.category || 'digital'}
        platform={product?.platform || 'PC'}
        height={height}
      />
    );
  }

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-t-xl bg-slate-900 group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
    </div>
  );
}

export default ProductImage;
