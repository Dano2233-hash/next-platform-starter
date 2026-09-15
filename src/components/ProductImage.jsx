import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

const ProductImage = ({
  src,
  alt = '',
  title = '',
  category = '',
  platform = '',
  className = 'h-48 w-full'
}) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`${className} overflow-hidden`}>
        <ProductVisual title={title || alt} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden bg-slate-900/60 flex items-center justify-center`}>
      <img
        src={src}
        alt={alt || title}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
