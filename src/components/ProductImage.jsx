import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  image,
  alt = 'Product Image',
  category = '',
  platform = '',
  className = ''
}) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return <ProductVisual name={alt} category={category} platform={platform} />;
  }

  return (
    <div className={`relative w-full h-48 bg-slate-900/50 overflow-hidden ${className}`}>
      <img
        src={image}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
    </div>
  );
}
