import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ src, alt, category, platform, className = 'w-full h-48' }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`${className} overflow-hidden rounded-t-xl bg-[#080d26]`}>
        <ProductVisual name={alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden rounded-t-xl relative bg-[#080d26]`}>
      <img
        src={src}
        alt={alt || 'Product image'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};
