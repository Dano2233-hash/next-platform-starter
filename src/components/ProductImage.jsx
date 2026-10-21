import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ image, name, category, platform, className = '' }) {
  const [hasError, setHasError] = useState(false);

  if (!image || hasError) {
    return <ProductVisual name={name} category={category} platform={platform} />;
  }

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 group-hover:border-cyan-500/50 transition-all ${className}`}>
      <img
        src={image}
        alt={name}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
