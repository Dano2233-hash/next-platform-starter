import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage if old price exists
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#0a0f24]/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 relative">
      {/* Top Image Section */}
      <Link to={`/product/${product.id}`} className="block relative">
        <ProductImage product={product} className="w-full h-44" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md bg-slate-900/85 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-sm">
              {product.platform || 'PC'}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md bg-purple-950/85 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-sm">
              {product.type || 'Digital'}
            </span>
          </div>

          {hasDiscount && !isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-rose-600 text-white shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}

          {isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-600/90 text-white shadow-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Out of Stock
            </span>
          )}
        </div>

        {/* Tag line badge if exists */}
        {product.tag && !isOutOfStock && (
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded bg-cyan-950/90 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
              {product.tag}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
            {product.description || 'Premium digital product with fast instant delivery.'}
          </p>

          {/* Stats Bar (Sold Count, Rating, Packages) */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-b border-slate-800/80 py-2 mb-3">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{product.soldCount || 0} sold</span>
            </div>

            <div className="text-slate-400 font-medium">
              {packageCount} {packageCount === 1 ? 'pack' : 'packs'}
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">From</span>
              <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>

            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 border ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 active:scale-95'
              }`}
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-950 active:scale-95'
              }`}
              title="Buy Now"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
