import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

/**
 * Robust ProductImage component.
 * Fallbacks cleanly to ProductVisual if image fails or is missing.
 */
export function ProductImage({ image, name, category, platform, type, className }) {
  const [hasError, setHasError] = useState(false);

  // If no image is provided, display the fallback directly
  if (!image || image.trim() === '') {
    return <ProductVisual name={name} category={category} platform={platform} type={type} />;
  }

  if (hasError) {
    return <ProductVisual name={name} category={category} platform={platform} type={type} />;
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setHasError(true)}
      className={`${className} object-cover rounded-t-lg`}
    />
  );
}
