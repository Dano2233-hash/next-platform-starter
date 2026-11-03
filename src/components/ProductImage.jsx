import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable ProductImage component:
 * - If product.image exists, show real image
 * - If image fails to load (onError), fallback to ProductVisual
 * - If image is missing, show ProductVisual
 * - Never show broken image icons
 * - Fixed height and object-cover
 */
export default function ProductImage({
  product,
  aspect = 'aspect-[16/10]',
  height = 'h-48',
  className = '',
}) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = product?.image?.trim();

  if (!imageUrl || hasError) {
    return (
      <div className={`w-full ${height} ${className} overflow-hidden rounded-t-xl`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${height} overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      <img
        src={imageUrl}
        alt={product?.name || 'Product'}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle overlay gradient to ensure text readability on top */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
