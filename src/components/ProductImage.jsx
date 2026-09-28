import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ src, alt = 'Product image', category = '', platform = '', className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <ProductVisual title={alt} category={category} platform={platform} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

export default ProductImage;
