import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ image, name, category, platform, className = "h-48 w-full" }) => {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return (
      <div className={`overflow-hidden rounded-t-xl ${className}`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-t-xl bg-slate-900 relative ${className}`}>
      <img
        src={image}
        alt={name || 'Product Image'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
