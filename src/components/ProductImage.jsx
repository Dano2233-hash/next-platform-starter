import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual.jsx';

export const ProductImage = ({ product, className = 'h-48 w-full' }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = product && product.image && product.image.trim() !== '' && !imageError;

  if (!hasValidImage) {
    return (
      <div className={`relative ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
