import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = "" }) {
  const [error, setError] = useState(false);

  // Fallback triggers if image string is missing or fails to load
  if (!product.image || error) {
    return (
      <div className={className}>
        <ProductVisual
          name={product.name}
          category={product.category}
          platform={product.platform}
        />
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      onError={() => setError(true)}
      className={`w-full h-full object-cover transition-premium hover:scale-105 ${className}`}
    />
  );
}
