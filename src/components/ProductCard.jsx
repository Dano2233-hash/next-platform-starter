import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

/**
 * Product Card Requirement:
 * - Product image (with fallback)
 * - Platform badge: PC / Xbox / PlayStation / Mobile / Gift Card
 * - Type badge: Game / Top-Up / Gift Card / Subscription / Account
 * - Product title
 * - Short description
 * - Sold count
 * - Rating
 * - Package count
 * - Price: From X IQD
 * - Old price if sale
 * - Discount badge if sale
 * - Buy button
 * - Add to cart button
 * - Out of stock badge if unavailable
 */
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    buyNow(product);
    navigate('/checkout');
  };

  // Color mappings for platform badge
  const getPlatformBadgeColor = (plat) => {
    switch (plat) {
      case 'PC':
        return 'bg-blue-950/80 text-blue-400 border-blue-500/30';
      case 'Xbox':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
      case 'PlayStation':
        return 'bg-indigo-950/80 text-indigo-400 border-indigo-500/30';
      case 'Mobile':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30';
      case 'Gift Card':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/30';
      case 'Subscription':
        return 'bg-purple-950/80 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#0a0e1c] border border-white/5 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 overflow-hidden">

      {/* Clickable Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
        <ProductImage product={product} heightClass="h-44 sm:h-48" />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {/* Platform badge */}
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getPlatformBadgeColor(product.platform)}`}>
            {product.platform}
          </span>
          {/* Type badge */}
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-900/90 text-slate-300 border border-white/10 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Top Right: Discount or Tag badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse">
              -{discountPercent}%
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-xs uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Social Proof: Rating & Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              <span>{product.soldCount || 0}+ sold</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-400 transition-colors" title={product.name}>
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Packages Count info */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>{packageCount} {packageCount === 1 ? 'Package' : 'Packages'}</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> In Stock
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-2.5 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              {packageCount > 1 ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-cyan-400 font-heading tracking-wide">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions: Buy Now & Add to Cart */}
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              isOutOfStock
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-white/10 hover:border-cyan-500/40 hover:text-cyan-300'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isOutOfStock
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}
