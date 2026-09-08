import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, className = "h-48" }) => {
  const [imageError, setImageError] = useState(false);

  if (!product || !product.image || imageError) {
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
    <div className={`relative w-full ${className} overflow-hidden rounded-t-xl bg-slate-900 group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
