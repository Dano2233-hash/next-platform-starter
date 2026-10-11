import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ src, alt, category, platform, type, className = '' }) {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = src && typeof src === 'string' && src.trim().length > 0 && !imageError;

  return (
    <div className={`relative overflow-hidden rounded-xl w-full h-44 bg-slate-900 border border-slate-800 ${className}`}>
      {hasValidImage ? (
        <img
          src={src}
          alt={alt || 'Product image'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <ProductVisual name={alt} category={category} platform={platform} type={type} />
      )}
    </div>
  );
}
