import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

const ProductImage = ({ product, alt, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = product?.image && typeof product.image === 'string' && product.image.trim() !== '';

  if (!hasImage || imageError) {
    return <ProductVisual product={product} />;
  }

  return (
    <div className={`relative w-full h-48 bg-slate-900 rounded-t-xl overflow-hidden group ${className}`}>
      <img
        src={product.image}
        alt={alt || product?.name || 'Digital product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export default ProductImage;
