import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product Image',
  category = 'games',
  platform = 'PC',
  className = ''
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <ProductVisual
        name={alt}
        category={category}
        platform={platform}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full h-48 bg-slate-900 rounded-t-xl overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
