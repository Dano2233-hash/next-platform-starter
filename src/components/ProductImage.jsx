import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-44' }) {
  const [hasError, setHasError] = useState(false);

  if (!product.image || hasError) {
    return (
      <div className={`w-full ${className}`}>
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
      onError={() => setHasError(true)}
      className={`w-full ${className} object-cover rounded-lg border border-[#1a1e29] transition-all duration-300 group-hover:scale-102`}
    />
  );
}
