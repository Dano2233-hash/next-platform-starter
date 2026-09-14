import React, { useState } from 'react';
import ProductVisual from './ProductVisual.jsx';

export default function ProductImage({
  src,
  alt,
  category,
  platform,
  type,
  aspectRatio = 'aspect-[16/10]',
  className = ''
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`w-full ${aspectRatio} relative overflow-hidden rounded-xl ${className}`}>
        <ProductVisual
          name={alt}
          category={category}
          platform={platform}
          type={type}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${aspectRatio} relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group ${className}`}>
      <img
        src={src}
        alt={alt || 'Product Image'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
