import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable ProductImage component:
 * - If product.image exists and loads, displays the image
 * - If missing or fails to load, falls back to ProductVisual
 * - Unified height, object-cover, rounded corners
 */
export function ProductImage({
  image,
  name,
  category,
  platform,
  className = '',
  containerClassName = 'h-44 w-full'
}) {
  const [hasError, setHasError] = useState(false);

  // If no image provided or error occurred, render fallback directly
  if (!image || hasError) {
    return (
      <div className={`relative overflow-hidden rounded-t-xl ${containerClassName}`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-xl bg-slate-900 ${containerClassName}`}>
      <img
        src={image}
        alt={name}
        onError={() => setHasError(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
    </div>
  );
}

export default ProductImage;
