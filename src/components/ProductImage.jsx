import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ image, title, category, platform, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  // If no image URL is provided or an error occurred during loading, render ProductVisual fallback
  if (!image || imageError) {
    return <ProductVisual title={title} category={category} platform={platform} />;
  }

  return (
    <div className={`relative w-full h-full min-h-[180px] bg-[#090d1a] overflow-hidden ${className}`}>
      <img
        src={image}
        alt={title || 'Product'}
        onError={() => setImageError(true)}
        loading="lazy"
        className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default ProductImage;
