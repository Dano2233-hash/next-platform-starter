import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * ProductImage rules:
 * - If product.image exists, show the real image
 * - If image fails to load, show ProductVisual fallback
 * - If image is missing, show ProductVisual fallback
 * - Never show broken image icons
 * - All images must have same height
 * - Use object-cover
 * - Use rounded corners
 */
export function ProductImage({
  image,
  name,
  category,
  platform,
  type,
  className = 'h-48 w-full'
}) {
  const [hasError, setHasError] = useState(false);

  // If no image provided or error occurred, render styled ProductVisual fallback
  if (!image || hasError) {
    return (
      <div className={`${className} overflow-hidden rounded-t-xl`}>
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
    <div className={`${className} relative overflow-hidden rounded-t-xl bg-[#0a0f1d]`}>
      <img
        src={image}
        alt={name}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default ProductImage;
