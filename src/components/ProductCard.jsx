import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;
  const packageCount = product.packages ? product.packages.length : 0;

  // Calculate discount percentage if old price exists
  let discountPercent = null;
  if (product.oldPrice && product.oldPrice > product.price) {
    discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group relative bg-[#0a0f1d] hover:bg-[#0e1628] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.15)] transition-all duration-300 flex flex-col h-full">
      {/* Top Image Container */}
      <div className="relative p-2.5">
        <Link to={`/product/${product.slug || product.id}`} className="block">
          <ProductImage product={product} className="h-44" />
        </Link>

        {/* Badges Over Image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-purple-950/90 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-md">
            {product.type}
          </span>
        </div>

        {/* Sale / Tag / Stock Badges top right */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10 pointer-events-none">
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-red-950/90 text-red-400 border border-red-600/50 backdrop-blur-md shadow-md">
              Out of Stock
            </span>
          ) : discountPercent ? (
            <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-md bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-cyan-600/90 text-white backdrop-blur-md shadow-md">
              {product.tag}
            </span>
          ) : null}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{product.soldCount || 0} Sold</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Package Info */}
          {packageCount > 0 && (
            <div className="mt-2 text-[11px] font-medium text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-800/60 inline-block">
              {packageCount} {packageCount === 1 ? 'Package' : 'Packages Available'}
            </div>
          )}
        </div>

        {/* Bottom Price & Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-cyan-400 font-semibold">From</span>
                <span className="text-base font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20 hover:shadow-cyan-500/30'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
