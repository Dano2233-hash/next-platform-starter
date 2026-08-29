import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable ProductImage component.
 * Displays real image if provided, falling back gracefully to ProductVisual on error or missing image.
 */
export default function ProductImage({
  image,
  alt = 'Product Image',
  name = 'Product',
  category = 'Digital',
  platform = 'PC',
  heightClass = 'h-48',
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return (
      <ProductVisual
        name={name}
        category={category}
        platform={platform}
        heightClass={heightClass}
      />
    );
  }

  return (
    <div className={`w-full ${heightClass} overflow-hidden rounded-xl bg-slate-900 relative ${className}`}>
      <img
        src={image}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}
