import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product image',
  category,
  platform,
  className = ''
}) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || imageError;

  return (
    <div className={`relative w-full h-48 overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      ) : (
        <ProductVisual name={alt} category={category} platform={platform} />
      )}
    </div>
  );
}
