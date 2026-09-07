import React, { useState } from 'react'
import { ProductVisual } from './ProductVisual'

export function ProductImage({
  image,
  name,
  category,
  platform,
  type,
  className = 'w-full h-48 rounded-xl object-cover'
}) {
  const [imageError, setImageError] = useState(false)

  if (!image || imageError) {
    return (
      <ProductVisual
        name={name}
        category={category}
        platform={platform}
        type={type}
        className={className}
      />
    )
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 border border-slate-800 ${className}`}>
      <img
        src={image}
        alt={name || 'Product'}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  )
}
