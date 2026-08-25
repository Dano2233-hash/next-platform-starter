import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48' }) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = product?.image?.trim();

  if (!imageSrc || hasError) {
    return (
      <div className={`w-full ${className} overflow-hidden rounded-t-xl`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} overflow-hidden rounded-t-xl bg-slate-900 relative group`}>
      <img
        src={imageSrc}
        alt={product?.name || 'Product'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
