import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = '',
  name = '',
  category = 'games',
  platform = 'PC',
  className = 'h-48 w-full'
}) {
  const [hasError, setHasError] = useState(false);

  // If no source or error occurred, render fallback visual
  if (!src || hasError) {
    return (
      <div className={`overflow-hidden rounded-t-xl ${className}`}>
        <ProductVisual name={name || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-950 rounded-t-xl ${className}`}>
      <img
        src={src}
        alt={alt || name}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
