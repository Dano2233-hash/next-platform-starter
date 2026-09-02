import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48 w-full' }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '' && !imageError);

  if (!hasImage) {
    return (
      <div className={`relative ${className} overflow-hidden rounded-t-xl bg-slate-900`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden bg-slate-900 rounded-t-xl`}>
      <img
        src={product.image}
        alt={product.name || 'Product Image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
}
