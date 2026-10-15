import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ product, className = 'w-full h-48' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = product?.image && product.image.trim() !== '' && !imageError;

  if (!hasImage) {
    return (
      <div className={`${className} overflow-hidden rounded-t-xl bg-[#090d1a]`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden rounded-t-xl bg-[#090d1a] relative group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};
