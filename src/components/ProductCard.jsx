import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Check, Flame } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const isOutOfStock = product.stock === 0 || product.stock === '0' || product.stock === 'Out of Stock';

  // Calculate discount percentage if old price exists
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
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
    addToCart(product);
    navigate('/checkout');
  };

  const packageCount = product.packages ? product.packages.length : 1;

  return (
    <div className="group relative flex flex-col bg-[#0b0f21] rounded-2xl border border-slate-800/90 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-300 overflow-hidden h-full">
      {/* Top Badges overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
        {discountPercent > 0 && (
          <span className="inline-flex items-center gap-1 bg-red-600/90 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-md backdrop-blur-sm">
            <Flame className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            -{discountPercent}%
          </span>
        )}
        {product.tag && (
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Out of stock badge */}
      {isOutOfStock && (
        <div className="absolute top-3 right-3 z-10 bg-slate-950/90 text-red-400 border border-red-500/40 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
          Out of Stock
        </div>
      )}

      {/* Clickable Card Link to Details */}
      <Link to={`/product/${product.slug}`} className="flex flex-col flex-1">
        <ProductImage product={product} className="h-44 sm:h-48" />

        <div className="flex flex-col flex-1 p-4">
          {/* Platform & Type Badges */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              {product.platform || 'Global'}
            </span>
            <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">
              {product.type || 'Digital'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[2rem]">
            {product.description}
          </p>

          {/* Stats: Rating & Sold count & Packages */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 mb-3">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span>{product.soldCount || 100}+ Sold</span>
            <span className="text-slate-500">{packageCount} {packageCount === 1 ? 'Pack' : 'Packs'}</span>
          </div>

          {/* Pricing */}
          <div className="mt-auto pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Starting From
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-cyan-400">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-950/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950" />
          Buy
        </button>
      </div>
    </div>
  );
}
