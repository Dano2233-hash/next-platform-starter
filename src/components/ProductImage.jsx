import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt,
  product,
  aspectRatio = 'aspect-[16/10]',
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`w-full ${aspectRatio} relative overflow-hidden rounded-t-xl`}>
        <ProductVisual
          name={product?.name || alt}
          category={product?.category}
          platform={product?.platform}
          type={product?.type}
          className={className}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${aspectRatio} relative overflow-hidden bg-slate-900 rounded-t-xl group`}>
      <img
        src={src}
        alt={alt || product?.name || 'Product Image'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60" />
    </div>
  );
}
