import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product Image',
  name = '',
  category = '',
  platform = '',
  className = 'w-full h-48 object-cover rounded-t-xl',
}) {
  const [hasError, setHasError] = useState(false);

  // If no image src or if image previously failed to load, render ProductVisual fallback
  if (!src || hasError) {
    return (
      <ProductVisual
        name={name || alt}
        category={category}
        platform={platform}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
