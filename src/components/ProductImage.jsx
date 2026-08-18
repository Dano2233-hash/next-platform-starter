import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export function ProductImage({ image, name, category, platform, className = "h-48" }) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !image || image.trim() === "" || imageError;

  return (
    <div className={`relative w-full overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      {showFallback ? (
        <ProductVisual name={name} category={category} platform={platform} />
      ) : (
        <img
          src={image}
          alt={name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      )}
    </div>
  );
}
