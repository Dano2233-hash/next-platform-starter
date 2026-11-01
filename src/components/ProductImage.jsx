import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product Image',
  className = '',
  productName = '',
  category = 'games',
  platform = 'PC'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If src is explicitly empty, undefined or has failed to load, show ProductVisual
  if (!src || hasError) {
    return (
      <div className={`w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#0b1120] ${className}`}>
        <ProductVisual name={productName || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#0b1120] relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#0f172a] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
