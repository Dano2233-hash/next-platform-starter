import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export function ProductImage({
  src,
  alt,
  category,
  platform,
  className = '',
  heightClass = 'h-48'
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <ProductVisual
        name={alt}
        category={category}
        platform={platform}
        heightClass={heightClass}
      />
    );
  }

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden bg-slate-950 rounded-t-xl group`}>
      <img
        src={src}
        alt={alt || 'Product'}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
        loading="lazy"
      />
      {/* Subtle bottom gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
