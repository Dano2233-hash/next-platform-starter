import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleCardClick = (e) => {
    // Prevent navigation if clicked on action buttons
    if (e.target.closest('button')) return;
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleAddCartClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNowClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      if (onAddToCart) onAddToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col h-full cursor-pointer overflow-hidden"
    >
      {/* Product Image Component */}
      <div className="relative">
        <ProductImage product={product} height="h-44" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md uppercase tracking-wide">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30 backdrop-blur-md uppercase">
            {product.type}
          </span>
        </div>

        {/* Discount & Out of Stock Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10 pointer-events-none">
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-600/90 text-white shadow-md uppercase">
              Out of Stock
            </span>
          ) : hasDiscount ? (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-600/80 text-white border border-purple-400/30 shadow-md">
              {product.tag}
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Meta info: Rating, Sold Count, Package Count */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-200">{product.rating || '5.0'}</span>
            <span className="text-slate-500">({product.soldCount || 0} sold)</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] font-medium border border-slate-700/50">
            {packageCount} {packageCount === 1 ? 'Option' : 'Packages'}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-cyan-400">
                {packageCount > 1 ? 'From ' : ''}{formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 mt-auto">
          <button
            type="button"
            onClick={handleAddCartClick}
            disabled={isOutOfStock}
            className="w-full py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNowClick}
            disabled={isOutOfStock}
            className="w-full py-2 px-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
