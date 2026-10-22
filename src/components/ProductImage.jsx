import React, { useState, useEffect } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, heightClass = 'h-48', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  // Reset error state if product changes
  useEffect(() => {
    setImageError(false);
  }, [product?.id, product?.image]);

  const hasValidImage = product?.image && typeof product.image === 'string' && product.image.trim().length > 0;

  if (!hasValidImage || imageError) {
    return <ProductVisual product={product} heightClass={heightClass} />;
  }

  return (
    <div className={`relative w-full ${heightClass} bg-slate-900 rounded-t-xl overflow-hidden group-hover:opacity-95 transition-opacity ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
