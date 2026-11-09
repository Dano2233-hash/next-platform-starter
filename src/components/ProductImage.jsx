import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable ProductImage component
 * Requirements:
 * - If product.image exists, show real image
 * - If image fails to load, show ProductVisual fallback
 * - If image is missing, show ProductVisual fallback
 * - Never show broken image icons
 * - Uniform height with object-cover and rounded corners
 */
export default function ProductImage({
  product = {},
  className = '',
  aspectRatio = 'aspect-[16/10]',
  heightClass = 'h-48'
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = product.image ? product.image.trim() : '';

  if (!imageUrl || imageFailed) {
    return (
      <div className={`w-full overflow-hidden rounded-xl ${aspectRatio} ${heightClass} ${className}`}>
        <ProductVisual
          name={product.name || 'Digital Product'}
          category={product.category || 'games'}
          platform={product.platform || 'PC'}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-slate-900 ${aspectRatio} ${heightClass} ${className}`}>
      <img
        src={imageUrl}
        alt={product.name || 'Product'}
        onError={() => setImageFailed(true)}
        loading="lazy"
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
