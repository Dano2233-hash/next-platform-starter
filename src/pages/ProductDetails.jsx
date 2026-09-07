import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { ProductImage } from '../components/ProductImage'
import { formatPrice } from '../utils/formatPrice'
import {
  Star,
  ShoppingBag,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Package,
  Layers
} from 'lucide-react'

export function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const { addToCart } = useCart()

  const product = products.find(p => p.slug === slug || p.id === slug)

  const packages = product?.packages || []
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0)

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Products
        </Link>
      </div>
    )
  }

  const activePackage = packages[selectedPkgIndex] || {
    name: 'Standard Package',
    price: product.price,
    oldPrice: product.oldPrice
  }

  const currentPrice = Number(activePackage.price || product.price)
  const currentOldPrice = activePackage.oldPrice ? Number(activePackage.oldPrice) : (product.oldPrice ? Number(product.oldPrice) : null)
  const isOutOfStock = Number(product.stock) <= 0

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addToCart(product, activePackage, 1)
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return
    addToCart(product, activePackage, 1)
    navigate('/checkout')
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      {/* Main product card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Image Visual (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="w-full h-80 sm:h-96 rounded-3xl object-cover shadow-2xl"
          />

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="block font-bold text-slate-200">Instant Delivery</span>
                <span className="text-[10px] text-slate-400">Automated process</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="block font-bold text-slate-200">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Official license</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Details (7 cols) */}
        <div className="lg:col-span-7 bg-[#080d1a] p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          {/* Platform & Type Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {product.platform && (
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
            )}
            {product.category && (
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300">
                {product.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {product.name}
          </h1>

          {/* Rating and Sold */}
          <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span>•</span>
            <span>{product.soldCount ? `${product.soldCount.toLocaleString()} items sold` : 'Available in stock'}</span>
            <span>•</span>
            <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
              {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
            </span>
          </div>

          {/* Price display */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">Price:</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-cyan-400">
                {formatPrice(currentPrice)}
              </span>
              {currentOldPrice && (
                <span className="text-sm font-medium text-slate-500 line-through">
                  {formatPrice(currentOldPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Package Selection */}
          {packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold truncate">{pkg.name}</span>
                      <span className="block text-xs font-extrabold text-white mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300">Product Overview:</h4>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Buy & Cart Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700/60 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs disabled:opacity-50 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
