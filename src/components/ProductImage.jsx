import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({
  src,
  alt = 'Product image',
  name = '',
  category = '',
  platform = '',
  className = 'w-full h-48 object-cover rounded-t-xl'
}) => {
  const [imageError, setImageError] = useState(false);

  // If missing or failed to load image, render fallback visual
  if (!src || imageError) {
    return (
      <div className={`w-full h-48 rounded-t-xl overflow-hidden ${className}`}>
        <ProductVisual name={name || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 bg-slate-900 rounded-t-xl overflow-hidden group-hover:opacity-95 transition-opacity">
      <img
        src={src}
        alt={alt || name}
        onError={() => setImageError(true)}
        className={`w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300 ${className}`}
        loading="lazy"
      />
    </div>
  );
};
