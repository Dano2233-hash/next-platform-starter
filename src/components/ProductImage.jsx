import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ product, className = 'h-48 w-full' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '' && !imageError);

  if (!hasImage) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
          type={product?.type}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
      <img
        src={product.image}
        alt={product.name || 'Product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
      {/* Subtle overlay gradient at the bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export default ProductImage;
