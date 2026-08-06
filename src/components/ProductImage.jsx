import React, { useState } from 'react';
import ProductVisual from './ProductVisual';

export default function ProductImage({ product, className = '' }) {
  const [error, setError] = useState(false);

  // Reset error state if product image source changes
  React.useEffect(() => {
    setError(false);
  }, [product.image]);

  if (!product.image || error) {
    return (
      <div className={`w-full aspect-[16/10] min-h-[160px] ${className}`}>
        <ProductVisual name={product.name} category={product.category} platform={product.platform} />
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      onError={() => setError(true)}
      className={`w-full aspect-[16/10] object-cover rounded-lg border border-slate-800 ${className}`}
    />
  );
}
