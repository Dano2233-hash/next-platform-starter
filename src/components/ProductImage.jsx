import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ image, name, category, platform, className = "w-full h-44 object-cover rounded-lg" }) => {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return <ProductVisual name={name} category={category} platform={platform} />;
  }

  return (
    <div className="relative w-full h-44 overflow-hidden rounded-lg bg-slate-900 border border-slate-800">
      <img
        src={image}
        alt={name || 'Product Image'}
        onError={() => setImageError(true)}
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
};
