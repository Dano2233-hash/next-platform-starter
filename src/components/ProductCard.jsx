import React from 'react';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow, onViewDetails }) {
  if (!product) return null;

  const isOutOfStock = product.stock <= 0;

  // Get minimum price if product has packages
  const hasPackages = product.packages && product.packages.length > 0;
  const displayPrice = hasPackages
    ? Math.min(...product.packages.map((pkg) => pkg.price))
    : product.price;

  // Determine if there's an old price and discount
  const currentOldPrice = product.oldPrice;
  const showDiscount = currentOldPrice && currentOldPrice > displayPrice;
  const discountPercent = showDiscount
    ? Math.round(((currentOldPrice - displayPrice) / currentOldPrice) * 100)
    : 0;

  // Render platform style badge
  const getPlatformStyle = (platform) => {
    switch (platform) {
      case 'PC':
        return 'bg-blue-950/50 text-blue-400 border-blue-500/20';
      case 'Xbox':
        return 'bg-green-950/50 text-green-400 border-green-500/20';
      case 'PlayStation':
        return 'bg-indigo-950/50 text-indigo-400 border-indigo-500/20';
      case 'Mobile':
        return 'bg-cyan-950/50 text-cyan-400 border-cyan-500/20';
      case 'Gift Card':
        return 'bg-yellow-950/50 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-500/20';
    }
  };

  // Render type style badge
  const getTypeStyle = (type) => {
    switch (type) {
      case 'Game':
        return 'bg-purple-950/50 text-purple-400 border-purple-500/20';
      case 'Top-Up':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20';
      case 'Subscription':
        return 'bg-pink-950/50 text-pink-400 border-pink-500/20';
      case 'Gift Card':
        return 'bg-amber-950/50 text-amber-400 border-amber-500/20';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#0d0d12] border border-white/5 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getPlatformStyle(product.platform)}`}>
            {product.platform}
          </span>
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getTypeStyle(product.type)}`}>
            {product.type}
          </span>
        </div>

        {isOutOfStock ? (
          <span className="bg-red-950/90 text-red-400 border border-red-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg">
            Out of Stock
          </span>
        ) : showDiscount ? (
          <span className="bg-gradient-to-r from-red-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
            -{discountPercent}%
          </span>
        ) : product.tag ? (
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Product Image container */}
      <div
        onClick={() => onViewDetails(product)}
        className="cursor-pointer overflow-hidden relative bg-[#07070a] h-48"
      >
        <ProductImage product={product} className="h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Rating and Sold Count */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-zinc-200">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-zinc-500">{product.soldCount}+ Sold</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(product)}
          className="text-base font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200 cursor-pointer mb-1"
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-zinc-400 line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
          {product.description}
        </p>

        {/* Package Indicator */}
        <div className="text-[11px] text-zinc-500 mb-4 flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.04] px-2 py-1 rounded-lg w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>{hasPackages ? `${product.packages.length} Packages Available` : 'Single Package Option'}</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto mb-4">
          <span className="text-[11px] text-zinc-500 block">
            {hasPackages ? 'Starting From' : 'Price'}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-black text-[#00e5ff]">
              {formatPrice(displayPrice)}
            </span>
            {currentOldPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(currentOldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl border border-white/5 transition-all duration-200 ${
              isOutOfStock
                ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border-none'
                : 'bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>+Cart</span>
          </button>

          {/* Buy Now / Quick buy */}
          <button
            onClick={() => onBuyNow(product)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 text-xs font-black py-2.5 px-3 rounded-xl shadow-lg transition-all duration-200 ${
              isOutOfStock
                ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/10'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
