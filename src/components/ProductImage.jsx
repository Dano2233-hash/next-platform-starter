import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = '' }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '');

  if (!hasImage || imageError) {
    return (
      <ProductVisual
        name={product?.name || 'Product'}
        category={product?.category || 'Digital'}
        platform={product?.platform || 'PC'}
      />
    );
  }

  return (
    <div className={`relative w-full h-[190px] overflow-hidden rounded-t-xl bg-slate-900 ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}
