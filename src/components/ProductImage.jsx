import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = 'h-48', imgClassName = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!product?.image || imageError) {
    return <ProductVisual product={product} className={className} />;
  }

  return (
    <div className={`w-full ${className} overflow-hidden bg-slate-900 relative group`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
}
