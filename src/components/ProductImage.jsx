import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ src, alt, category, platform, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = src && src.trim() !== '' && !imageError;

  return (
    <div className={`relative overflow-hidden bg-slate-900 rounded-lg w-full h-48 ${className}`}>
      {hasImage ? (
        <img
          src={src}
          alt={alt || 'Product Image'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <ProductVisual title={alt} category={category} platform={platform} />
      )}
    </div>
  );
};
