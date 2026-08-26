import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  image,
  name,
  category,
  platform,
  heightClass = 'h-48',
  className = ''
}) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return (
      <div className={`w-full overflow-hidden rounded-xl ${className}`}>
        <ProductVisual
          name={name}
          category={category}
          platform={platform}
          heightClass={heightClass}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${heightClass} overflow-hidden rounded-xl bg-gray-900 relative ${className}`}>
      <img
        src={image}
        alt={name}
        onError={() => setHasError(true)}
        className={`w-full ${heightClass} object-cover transition-transform duration-300 group-hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
}
