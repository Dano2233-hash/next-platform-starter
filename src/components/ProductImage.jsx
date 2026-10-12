import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ src, alt, category, platform, className = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
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
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || 'Product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
}
