import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48 w-full' }) {
  const [hasError, setHasError] = useState(false);

  const imageUrl = product?.image;

  if (!imageUrl || hasError) {
    return (
      <ProductVisual
        name={product?.name}
        category={product?.category}
        platform={product?.platform}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      <img
        src={imageUrl}
        alt={product?.name || 'Product Image'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60" />
    </div>
  );
}
