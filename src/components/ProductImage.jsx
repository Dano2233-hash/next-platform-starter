import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = "" }) {
  const [error, setError] = useState(false);

  const fallback = (
    <div className={`w-full ${className}`}>
      <ProductVisual
        name={product.name}
        category={product.category}
        platform={product.platform}
      />
    </div>
  );

  if (!product.image || error) {
    return fallback;
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      onError={() => setError(true)}
      className={`w-full object-cover rounded-xl border border-white/5 bg-gray-900 transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  );
}
