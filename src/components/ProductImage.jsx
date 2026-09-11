import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

const ProductImage = ({ product, className = 'h-48' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim() !== '');

  if (!hasImage || imageError) {
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
    <div className={`relative w-full ${className} rounded-xl overflow-hidden bg-slate-900 border border-slate-800`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
