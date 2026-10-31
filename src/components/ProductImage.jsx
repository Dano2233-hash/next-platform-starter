import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  image,
  name,
  category,
  platform,
  type,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  height = 'h-48'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no image url provided, immediately render fallback visual
  if (!image || typeof image !== 'string' || image.trim() === '' || hasError) {
    return (
      <div className={`w-full ${height} overflow-hidden rounded-xl ${className}`}>
        <ProductVisual
          name={name}
          category={category}
          platform={platform}
          type={type}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group ${className}`}>
      {/* Background skeleton loader until image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 animate-pulse flex items-center justify-center">
          <ProductVisual
            name={name}
            category={category}
            platform={platform}
            type={type}
            className="w-full h-full opacity-60"
          />
        </div>
      )}

      <img
        src={image}
        alt={name || 'Product'}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle overlay gradient to ensure clean readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-40 pointer-events-none" />
    </div>
  );
}
