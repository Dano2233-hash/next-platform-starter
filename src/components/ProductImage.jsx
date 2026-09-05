import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, alt, className = 'h-48 w-full object-cover rounded-t-xl' }) => {
  const [hasError, setHasError] = useState(false);

  const imageUrl = product?.image || '';

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
    <div className="relative w-full h-48 overflow-hidden bg-slate-900 rounded-t-xl">
      <img
        src={imageUrl}
        alt={alt || product?.name || 'Product'}
        onError={() => setHasError(true)}
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
};
