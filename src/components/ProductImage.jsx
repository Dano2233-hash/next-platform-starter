import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  image,
  name,
  platform,
  category,
  alt,
  className = "h-44 w-full"
}) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return (
      <div className={`w-full overflow-hidden rounded-t-xl bg-[#090e1f] ${className}`}>
        <ProductVisual name={name} platform={platform} category={category} />
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden rounded-t-xl bg-[#090e1f] relative group ${className}`}>
      <img
        src={image}
        alt={alt || name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}
