import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * ProductImage component with fallback logic.
 * Ensures no broken image icons ever show up.
 */
export function ProductImage({
  src,
  alt = 'Product Image',
  name = '',
  category = 'pc',
  platform = 'PC',
  className = 'w-full h-44',
  imgClassName = '',
}) {
  const [hasError, setHasError] = useState(false);

  // If no source is provided or image failed loading, display the custom ProductVisual fallback
  if (!src || hasError) {
    return (
      <div className={`overflow-hidden rounded-t-xl ${className}`}>
        <ProductVisual name={name || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-xl bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || name}
        loading="lazy"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1222] via-transparent to-transparent opacity-80 pointer-events-none" />
    </div>
  );
}

export default ProductImage;
