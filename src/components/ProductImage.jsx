import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ image, name, category, platform, className = 'h-48' }) => {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return (
      <ProductVisual
        name={name}
        category={category}
        platform={platform}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-t-xl bg-slate-900 ${className} group`}>
      <img
        src={image}
        alt={name || 'Product Image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 ease-out"
        loading="lazy"
      />
      {/* Overlay gradient for clean contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 pointer-events-none opacity-80" />
    </div>
  );
};
