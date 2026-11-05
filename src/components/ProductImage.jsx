import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = '',
  name = 'Product',
  category = 'games',
  platform = 'PC',
  className = 'h-48 w-full',
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no source image provided or load error occurred, render ProductVisual fallback
  if (!src || hasError) {
    return (
      <div className={`${className} overflow-hidden rounded-xl`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-800/60 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-cyan-500/40 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || name}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
