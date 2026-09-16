import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({
  image,
  name,
  category,
  platform,
  className = 'h-48 w-full',
  alt = '',
}) {
  const [imageError, setImageError] = useState(false);

  const hasValidUrl = Boolean(
    image &&
    typeof image === 'string' &&
    image.trim() !== '' &&
    (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/'))
  );

  if (!hasValidUrl || imageError) {
    return (
      <div className={`relative overflow-hidden rounded-t-xl ${className}`}>
        <ProductVisual name={name} category={category} platform={platform} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 rounded-t-xl ${className}`}>
      <img
        src={image}
        alt={alt || name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Subtle bottom gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
    </div>
  );
}
