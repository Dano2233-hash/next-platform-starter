import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product image',
  category,
  platform,
  type,
  className = 'w-full h-48 object-cover rounded-t-xl',
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProductVisual name={alt} category={category} platform={platform} type={type} />;
  }

  return (
    <div className="relative w-full h-48 overflow-hidden bg-slate-900 rounded-t-xl">
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className={`${className} transition-transform duration-500 hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
}
