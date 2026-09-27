import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = '',
  name,
  category,
  platform,
  type,
  className = 'w-full h-48 object-cover rounded-xl',
  aspectRatio = 'aspect-[16/10]'
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`w-full h-48 ${aspectRatio} rounded-xl overflow-hidden`}>
        <ProductVisual
          name={name || alt}
          category={category}
          platform={platform}
          type={type}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-48 ${aspectRatio} bg-slate-900 rounded-xl overflow-hidden group`}>
      <img
        src={src}
        alt={alt || name}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 ${className}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
