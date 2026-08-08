import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ src, name, category, platform, className = "h-48" }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className={`${className} w-full overflow-hidden rounded-t-lg relative`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`${className} w-full overflow-hidden rounded-t-lg relative bg-black/40`}>
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
