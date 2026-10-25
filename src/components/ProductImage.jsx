import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product image',
  category = 'Games',
  platform = 'PC',
  className = 'w-full h-48 object-cover rounded-t-xl'
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProductVisual name={alt} category={category} platform={platform} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={`${className} transition-transform duration-300 group-hover:scale-105`}
      loading="lazy"
    />
  );
}
