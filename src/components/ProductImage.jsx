import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = "h-48" }) {
  const [error, setError] = useState(false);

  const hasImage = product && product.image && product.image.trim() !== "";

  if (error || !hasImage) {
    return (
      <div className={`w-full ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className} overflow-hidden rounded-xl bg-slate-950`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setError(true)}
        className="w-full h-full object-cover rounded-xl transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Sleek shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
