import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = "h-48", alt = "" }) {
  const [imageError, setImageError] = useState(false);

  // Reset error state if product image changes
  useEffect(() => {
    setImageError(false);
  }, [product?.image]);

  if (!product?.image || imageError) {
    return <ProductVisual product={product} className={className} />;
  }

  return (
    <div className={`relative w-full ${className} overflow-hidden rounded-lg bg-slate-900 border border-slate-800/80 group-hover:border-cyan-500/50 transition-colors`}>
      <img
        src={product.image}
        alt={alt || product.name}
        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        onError={() => setImageError(true)}
        loading="lazy"
      />
      {/* Platform badge overlay */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
          {product.platform || 'PC'}
        </span>
      </div>
      {/* Type badge overlay */}
      {product.type && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>
      )}
    </div>
  );
}
