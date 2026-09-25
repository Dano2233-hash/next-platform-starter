import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product',
  category,
  platform,
  className = 'h-48 w-full object-cover rounded-t-xl'
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <ProductVisual name={alt} category={category} platform={platform} />;
  }

  return (
    <div className="relative w-full h-48 bg-slate-900/80 overflow-hidden rounded-t-xl">
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className={`${className} transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
}
