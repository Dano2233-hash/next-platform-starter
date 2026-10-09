import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48 w-full', aspectRatio = '' }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '');

  if (!hasImage || imageError) {
    return (
      <div className={`overflow-hidden rounded-t-xl ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
          type={product?.type}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-xl bg-slate-900 ${className}`}>
      <img
        src={product.image}
        alt={product?.name || 'Product Image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
    </div>
  );
}
