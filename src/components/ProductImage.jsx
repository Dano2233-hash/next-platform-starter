import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, heightClass = 'h-48' }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product?.image && product.image.trim().length > 0 && !imageError);

  if (!hasImage) {
    return <ProductVisual product={product} heightClass={heightClass} />;
  }

  return (
    <div className={`relative ${heightClass} w-full overflow-hidden bg-slate-900 rounded-t-xl group`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => setImageError(true)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
