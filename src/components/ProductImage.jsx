import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({
  src,
  alt,
  name,
  category,
  platform,
  type,
  className = 'h-48'
}) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`w-full ${className} relative rounded-xl overflow-hidden`}>
        <ProductVisual
          name={name}
          category={category}
          platform={platform}
          type={type}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group`}>
      <img
        src={src}
        alt={alt || name || 'Product image'}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setImageError(true)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
    </div>
  );
};
