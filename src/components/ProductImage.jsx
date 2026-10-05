import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

const ProductImage = ({ src, alt, category, platform, type, className = "h-48" }) => {
  const [imageError, setImageError] = useState(false);

  const shouldShowFallback = !src || imageError;

  return (
    <div className={`w-full ${className} relative overflow-hidden bg-[#090e1f] flex items-center justify-center rounded-t-xl`}>
      {!shouldShowFallback ? (
        <img
          src={src}
          alt={alt || 'Dano Store Digital Product'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      ) : (
        <ProductVisual
          name={alt}
          category={category}
          platform={platform}
          type={type}
        />
      )}
    </div>
  );
};

export default ProductImage;
