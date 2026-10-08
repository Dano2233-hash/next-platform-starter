import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0 || product.isComingSoon;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages?.length || 1;

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
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="group relative flex flex-col bg-[#0b0f19] border border-slate-800/80 rounded-xl overflow-hidden glow-card transition-all duration-300">
      {/* Card Header & Image */}
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <ProductImage product={product} className="h-44" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan-950/90 text-cyan-400 border border-cyan-800/80 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Right Tag / Discount Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
          {hasDiscount && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-red-600/90 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
          {product.tag && !hasDiscount && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-purple-600/90 text-white shadow-md">
              {product.tag}
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-rose-950/90 text-rose-400 border border-rose-800">
              {product.isComingSoon ? 'Coming Soon' : 'Out of Stock'}
            </span>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Description */}
        <p className="mt-1 text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
          {product.description}
        </p>

        {/* Ratings, Sold Count, Package Count */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-b border-slate-800/60 py-2">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || '5.0'}</span>
          </div>
          <div>
            <span className="text-slate-300 font-medium">{product.soldCount || 0}</span> sold
          </div>
          <div className="text-cyan-400 font-semibold">
            {packageCount} {packageCount === 1 ? 'Pkg' : 'Pkgs'}
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-cyan-300">
                {packageCount > 1 ? `From ${formatPrice(product.price)}` : formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 border ${
              isOutOfStock
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-cyan-400 hover:text-cyan-300 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 shadow-md ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-950/50 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
