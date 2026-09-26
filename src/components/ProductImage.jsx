import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export const ProductImage = ({ product, className = 'h-48' }) => {
  const [hasError, setHasError] = useState(false);

  const hasValidImage = Boolean(product?.image && product.image.trim().length > 0 && !hasError);

  if (!hasValidImage) {
    return (
      <div className={`w-full ${className} overflow-hidden rounded-t-xl`}>
        <ProductVisual
          name={product?.name || 'Digital Item'}
          category={product?.category || ''}
          platform={product?.platform || ''}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className} relative overflow-hidden rounded-t-xl bg-slate-900 group`}>
      <img
        src={product.image}
        alt={product.name || 'Product Image'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export default ProductImage;
