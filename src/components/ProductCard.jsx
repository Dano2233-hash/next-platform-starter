import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Layers } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 0;

  // Calculate discount percentage if old price exists
  let discountPercent = null;
  if (product.oldPrice && product.oldPrice > product.price) {
    discountPercent = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#090d1a] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Badges overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
        {product.tag && (
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
            {product.tag}
          </span>
        )}
        {discountPercent && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-950/90 text-red-400 border border-red-800/60 shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      {/* Product Image Link */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        <ProductImage product={product} className="h-44 sm:h-48" />
      </Link>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Row: Platform & Type Badges */}
          <div className="flex items-center justify-between text-[11px] mb-2 gap-2">
            <span className="px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-medium border border-slate-700/50">
              {product.platform || 'PC'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-400 font-semibold border border-cyan-800/40">
              {product.type || 'Game'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px]">
            {product.description || 'Digital key & instant delivery.'}
          </p>

          {/* Stats Row: Sold Count, Rating, Packages */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 mt-3">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.8'}</span>
            </div>

            {packageCount > 0 ? (
              <div className="flex items-center gap-1 text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
                <span>{packageCount} Pkgs</span>
              </div>
            ) : (
              <span className="text-slate-500">{product.soldCount || 100}+ sold</span>
            )}

            <span className="text-slate-500 font-medium">{product.soldCount || 250} sold</span>
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {packageCount > 0 ? 'From' : 'Price'}
              </span>
              <span className="text-base font-extrabold text-cyan-300">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-semibold text-xs transition-all duration-200 border ${
                isOutOfStock
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-950/50 hover:shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
