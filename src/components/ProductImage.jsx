import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ src, alt, name, category, platform, className = "h-48" }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`w-full ${className} overflow-hidden rounded-t-xl bg-[#080d1a]`}>
        <ProductVisual name={name || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} overflow-hidden rounded-t-xl bg-[#080d1a] relative group`}>
      <img
        src={src}
        alt={alt || name || 'Product image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
