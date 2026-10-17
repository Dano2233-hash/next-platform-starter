import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt,
  category,
  platform,
  className = 'w-full h-48 object-cover rounded-t-xl'
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
    <img
      src={src}
      alt={alt || 'Product'}
      onError={() => setHasError(true)}
      className={`${className} bg-slate-900 transition-transform duration-300 group-hover:scale-105`}
      loading="lazy"
    />
  );
}
