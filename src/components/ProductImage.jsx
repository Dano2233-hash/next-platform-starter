import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = '',
  category = '',
  platform = '',
  className = ''
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <ProductVisual name={alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
