import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, PackageCheck } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart, onBuyNow }) {
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const minPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  return (
    <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl overflow-hidden flex flex-col hover:border-cyan-500/50 transition-all duration-300 group shadow-lg shadow-black/40 hover:shadow-cyan-500/10">
      {/* Top Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug || product.id}`}>
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            height="h-44 sm:h-48"
          />
        </Link>

        {/* Platform Badge */}
        <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-400 font-bold text-[10px] tracking-wider uppercase border border-cyan-500/30">
          {product.platform || 'Digital'}
        </span>

        {/* Type Badge */}
        <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-purple-950/80 backdrop-blur-md text-purple-300 font-semibold text-[10px] uppercase border border-purple-500/30">
          {product.type || 'Product'}
        </span>

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-[10px]">
            -{discountPercent}%
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-slate-500 font-medium">
              {product.soldCount ? `${product.soldCount} sold` : 'Hot item'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Package info & Pricing */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-1 text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <PackageCheck className="w-3 h-3 text-cyan-400" />
              {product.packages?.length || 1} {product.packages?.length === 1 ? 'Option' : 'Packages'}
            </span>
            {hasDiscount && (
              <span className="text-slate-500 line-through text-[11px]">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-[11px] text-slate-400 font-medium">From</span>
            <span className="text-base font-black text-cyan-400 tracking-tight">
              {formatPrice(minPrice)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => !isOutOfStock && onAddToCart && onAddToCart(product)}
            disabled={isOutOfStock}
            className="py-2 px-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={() => !isOutOfStock && onBuyNow ? onBuyNow(product) : null}
            disabled={isOutOfStock}
            className="py-2 px-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
