import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, ShoppingBag, ShoppingCart, Check } from 'lucide-react'
import { ProductImage } from './ProductImage'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'

export function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  if (!product) return null

  const isOutOfStock = Number(product.stock) <= 0
  const hasMultiplePackages = product.packages && product.packages.length > 1

  // Price calculations
  const minPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => Number(p.price)))
    : Number(product.price)

  const minOldPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => Number(p.oldPrice || p.price)))
    : Number(product.oldPrice || product.price)

  const hasDiscount = product.oldPrice && Number(product.oldPrice) > Number(product.price)
  const discountPercent = hasDiscount
    ? Math.round(((Number(product.oldPrice) - Number(product.price)) / Number(product.oldPrice)) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock) return
    const pkg = product.packages && product.packages.length > 0 ? product.packages[0] : null
    addToCart(product, pkg, 1)
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock) return
    const pkg = product.packages && product.packages.length > 0 ? product.packages[0] : null
    addToCart(product, pkg, 1)
    navigate('/checkout')
  }

  return (
    <div className="group relative bg-[#0a0f1d] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-cyan-500/10">
      <Link to={`/product/${product.slug}`} className="block p-3">
        {/* Image & Badges Overlay */}
        <div className="relative mb-3">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="w-full h-48 rounded-xl object-cover"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
            <div className="flex flex-wrap gap-1">
              {product.platform && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  {product.platform}
                </span>
              )}
              {product.type && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                  {product.type}
                </span>
              )}
            </div>

            {hasDiscount && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-red-600 text-white shadow-md">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Out of Stock Badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-xl flex items-center justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span>{product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Available'}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
            {product.description}
          </p>

          {/* Package Count info if applicable */}
          {hasMultiplePackages && (
            <div className="mb-2">
              <span className="inline-block px-2 py-0.5 rounded bg-slate-800/80 text-[11px] text-slate-300 border border-slate-700/50">
                {product.packages.length} Packages Available
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400 font-medium">
              {hasMultiplePackages ? 'From' : ''}
            </span>
            <span className="text-lg font-extrabold text-cyan-400">
              {formatPrice(minPrice)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-3 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  )
}
