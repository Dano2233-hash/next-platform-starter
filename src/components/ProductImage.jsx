import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, className = 'h-48' }) => {
  const [imageError, setImageError] = useState(false);

  if (!product || !product.image || imageError) {
    return (
      <div className={`w-full ${className} overflow-hidden rounded-t-xl`}>
        <ProductVisual
          name={product?.name || 'Product'}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} relative overflow-hidden bg-slate-900 rounded-t-xl group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
    </div>
  );
};
