import React, { useState } from 'react';
import ProductVisual from './ProductVisual.jsx';

export default function ProductImage({ src, alt, category, platform, className = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`w-full h-44 ${className}`}>
        <ProductVisual name={alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`w-full h-44 overflow-hidden relative bg-slate-950 ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}
