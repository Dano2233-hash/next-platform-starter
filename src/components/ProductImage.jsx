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

  // If no image source provided or load error occurred, render fallback visual
  if (!src || hasError) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <ProductVisual name={alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || 'Product Image'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
