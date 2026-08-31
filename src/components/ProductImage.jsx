import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48' }) {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(product?.image && product.image.trim().length > 0 && !imageError);

  if (!hasValidImage) {
    return (
      <div className={`w-full ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
