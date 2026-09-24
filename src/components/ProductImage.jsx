import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-44 w-full' }) {
  const [imageError, setImageError] = useState(false);

  if (!product.image || imageError) {
    return <ProductVisual product={product} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1021] via-transparent to-transparent opacity-60" />
    </div>
  );
}
