import React, { useState } from 'react';
import { ProductVisual } from './ProductVisual';

export const ProductImage = ({
  src,
  alt = 'Product Image',
  category = '',
  platform = '',
  className = 'w-full h-48',
}) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`${className} w-full overflow-hidden`}>
        <ProductVisual title={alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden bg-slate-900 rounded-xl group`}>
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
        loading="lazy"
      />
    </div>
  );
};
