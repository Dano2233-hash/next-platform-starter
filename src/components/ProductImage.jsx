import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt,
  category = "",
  platform = "",
  className = "w-full h-44 object-cover rounded-xl"
}) {
  const [imageError, setImageError] = useState(false);

  // If image missing or error, render clean ProductVisual fallback
  if (!src || imageError) {
    return (
      <ProductVisual
        name={alt || "Product"}
        category={category}
        platform={platform}
        className="w-full h-44 rounded-xl"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Product image"}
      onError={() => setImageError(true)}
      className={`${className} transition-transform duration-300 group-hover:scale-105`}
      loading="lazy"
    />
  );
}
