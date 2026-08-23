import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export function ProductImage({ src, alt, category, platform, height = 'h-48', className = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProductVisual name={alt || 'Product'} category={category} platform={platform} height={height} />;
  }

  return (
    <div className={`w-full ${height} overflow-hidden rounded-t-xl bg-slate-900 relative ${className}`}>
      <img
        src={src}
        alt={alt || 'Product image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}
