import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ src, alt, name, category, platform, className = 'w-full h-48' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <ProductVisual
        name={name || alt}
        category={category}
        platform={platform}
        className={`rounded-t-xl object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      <img
        src={src}
        alt={alt || name}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
