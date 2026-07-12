import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

const ProductImage = ({ src, alt, category, platform, productName, className = "" }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`overflow-hidden rounded-xl ${className}`}>
        <ProductVisual name={productName} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl bg-dark-700 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default ProductImage;
