import React, { useState } from 'react';
import ProductVisual from './ProductVisual.jsx';

export const ProductImage = ({ product, className = 'h-48' }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(product?.image) && !imageError;

  if (!hasValidImage) {
    return (
      <div className={`w-full ${className} overflow-hidden rounded-t-xl shrink-0`}>
        <ProductVisual
          name={product?.name}
          category={product?.category}
          platform={product?.platform}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} overflow-hidden rounded-t-xl relative shrink-0 bg-gray-900`}>
      <img
        src={product.image}
        alt={product.name || 'Product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
