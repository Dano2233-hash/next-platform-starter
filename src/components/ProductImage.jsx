import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export function ProductImage({ src, alt, category, platform, className = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProductVisual name={alt} category={category} platform={platform} />;
  }

  return (
    <div className={`w-full h-full overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt || 'Product image'}
        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}
