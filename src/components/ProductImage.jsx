import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  src,
  alt = 'Product image',
  title = 'Product',
  category = '',
  platform = '',
  className = 'w-full h-44 object-cover'
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <ProductVisual title={title} category={category} platform={platform} />;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-t-xl group">
      <img
        src={src}
        alt={alt || title}
        onError={() => setHasError(true)}
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
