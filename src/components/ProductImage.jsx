import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({ image, name, category, platform, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return (
      <div className={`w-full h-full ${className}`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={image}
        alt={name || 'Product Image'}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};
