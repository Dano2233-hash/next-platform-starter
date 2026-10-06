import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, className = 'h-48' }) => {
  const [hasError, setHasError] = useState(false);

  if (!product || !product.image || hasError) {
    return (
      <ProductVisual
        name={product?.name}
        category={product?.category}
        platform={product?.platform}
        type={product?.type}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full ${className} rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 group-hover:border-cyan-500/50 transition-all duration-300`}>
      <img
        src={product.image}
        alt={product.name || 'Product'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
