import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export function ProductImage({
  src,
  alt = 'Product image',
  name = '',
  category = '',
  platform = '',
  type = '',
  heightClass = 'h-48',
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  // If no image src or error occurred while loading
  if (!src || src.trim() === '' || hasError) {
    return (
      <div className={`w-full ${heightClass} ${className}`}>
        <ProductVisual name={name || alt} category={category} platform={platform} type={type} />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden rounded-lg bg-slate-900/60 ${className}`}>
      <img
        src={src}
        alt={alt || name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}

export default ProductImage;
