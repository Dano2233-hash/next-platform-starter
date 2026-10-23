import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = "h-48" }) {
  const [imageError, setImageError] = useState(false);

  if (!product?.image || imageError) {
    return (
      <ProductVisual
        name={product?.name || 'Product'}
        category={product?.category}
        platform={product?.platform}
        type={product?.type}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full ${className} overflow-hidden rounded-xl bg-slate-900`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Subtle Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-xl" />
    </div>
  );
}
