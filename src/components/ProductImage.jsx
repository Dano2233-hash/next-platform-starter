import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48' }) {
  const [hasError, setHasError] = useState(false);

  const imageUrl = product?.image;

  if (hasError || !imageUrl) {
    return (
      <div className={`w-full ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={product?.name || 'Product Image'}
      onError={() => setHasError(true)}
      className={`w-full ${className} object-cover rounded-xl transition-all duration-300 group-hover:scale-105`}
    />
  );
}
