import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable ProductImage component:
 * 1. Checks if product.image exists
 * 2. Attempts to load image
 * 3. Smooth fallback to ProductVisual on error or empty URL
 * 4. Constant height, object-cover, rounded corners
 */
export default function ProductImage({
  image,
  name,
  category,
  platform,
  className = '',
  heightClass = 'h-48'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanImage = typeof image === 'string' ? image.trim() : '';

  if (!cleanImage || hasError) {
    return (
      <ProductVisual
        name={name}
        category={category}
        platform={platform}
        className={`${heightClass} ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group-hover:border-slate-700 transition-colors ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
        </div>
      )}
      <img
        src={cleanImage}
        alt={name || 'Game item'}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none rounded-xl"></div>
    </div>
  );
}
