import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, className = '', heightClass = 'h-48' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim().length > 0 && !imageError);

  if (!hasImage) {
    return (
      <div className={`w-full ${heightClass} overflow-hidden rounded-t-xl`}>
        <ProductVisual
          title={product?.name || 'Product'}
          category={product?.category || 'Digital'}
          platform={product?.platform || ''}
          className="h-full rounded-t-xl rounded-b-none"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden bg-slate-900 rounded-t-xl group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${className}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f17] via-transparent to-transparent opacity-80"></div>
    </div>
  );
};
