import React, { useState, useEffect } from 'react';
import ProductVisual from './ProductVisual';

/**
 * Reusable Product Image component.
 * Fallbacks cleanly to ProductVisual if image is missing, empty, or fails to load.
 */
export function ProductImage({ product, className = 'h-48' }) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if product image changes
  useEffect(() => {
    setHasError(false);
  }, [product?.image, product?.id]);

  if (!product) return null;

  const showFallback = hasError || !product.image || product.image.trim() === '';

  if (showFallback) {
    return (
      <div className={`w-full overflow-hidden rounded-xl ${className}`}>
        <ProductVisual
          name={product.name}
          category={product.category}
          platform={product.platform}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-brand-card/30 border border-brand-border/40 ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default ProductImage;
