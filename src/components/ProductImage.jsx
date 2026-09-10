import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product image',
  name,
  category,
  platform,
  type,
  className = 'w-full h-48'
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <ProductVisual
        name={name}
        category={category}
        platform={platform}
        type={type}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
