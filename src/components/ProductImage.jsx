import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ product, className = "h-48 w-full" }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '');

  if (!hasImage || imageError) {
    return (
      <div className={`relative ${className}`}>
        <ProductVisual
          name={product?.name || 'Digital Item'}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-lg bg-slate-900 ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
