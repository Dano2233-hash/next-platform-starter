import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48' }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [product?.image, product?.id]);

  if (!product?.image || imageError) {
    return (
      <div className={`w-full ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
          type={product?.type}
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 ${className}`}>
      <img
        src={product.image}
        alt={product.name || 'Product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
