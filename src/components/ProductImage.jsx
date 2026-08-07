import React, { useState, useEffect } from 'react';
import { ProductVisual } from './ProductVisual';

export function ProductImage({ product }) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if product image changes
  useEffect(() => {
    setHasError(false);
  }, [product?.image]);

  if (!product) return null;

  if (!product.image || hasError) {
    return (
      <div className="w-full h-48 sm:h-52">
        <ProductVisual
          name={product.name}
          category={product.category}
          platform={product.platform}
          type={product.type}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-48 sm:h-52 overflow-hidden rounded-t-lg relative bg-slate-900">
      <img
        src={product.image}
        alt={product.name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      {/* Sleek subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
