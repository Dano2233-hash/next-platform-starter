import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48' }) {
  const [hasError, setHasError] = useState(false);

  const imageUrl = product?.image && product.image.trim().length > 0 ? product.image : null;

  if (!imageUrl || hasError) {
    return (
      <div className={`w-full ${className}`}>
        <ProductVisual
          name={product?.name || 'Digital Item'}
          category={product?.category || 'Gaming'}
          platform={product?.platform || 'Global'}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} relative overflow-hidden bg-slate-900 rounded-t-xl group`}>
      <img
        src={imageUrl}
        alt={product?.name || 'Product'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
