import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, Check, ShieldAlert } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    navigate('/checkout');
  };

  return (
    <div className="relative group bg-[#090e1a]/90 backdrop-blur border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden flex flex-col justify-between card-hover transition-all duration-300 shadow-lg">

      {/* Top Badges Overlay */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {product.platform && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#030712]/85 text-cyan-400 border border-cyan-500/30 backdrop-blur">
              {product.platform}
            </span>
          )}
          {product.type && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-900/85 text-purple-300 border border-purple-500/30 backdrop-blur">
              {product.type}
            </span>
          )}
        </div>

        {isSale && (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Product Link wrapper */}
      <Link to={`/product/${product.id}`} className="block flex-1">
        {/* Product Image */}
        <div className="relative">
          <ProductImage product={product} className="h-44 sm:h-48" />

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-3">
              <ShieldAlert className="w-8 h-8 text-rose-500 mb-1 animate-pulse" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2">
          {/* Rating and Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '4.9'}</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              {product.soldCount || 100}+ sold
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-sm sm:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
            {product.description}
          </p>

          {/* Package count info */}
          {packageCount > 0 && (
            <div className="text-[11px] text-cyan-400/90 font-medium">
              ⚡ {packageCount} package options available
            </div>
          )}

          {/* Price Section */}
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">From</span>
              <span className="text-base sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                {formatPrice(product.price)}
              </span>
            </div>
            {isSale && (
              <span className="text-xs text-slate-500 line-through font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 border ${
            isOutOfStock
              ? 'bg-slate-800/50 text-slate-500 border-slate-800 cursor-not-allowed'
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-500 active:scale-95'
          }`}
          title="Add to Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
            isOutOfStock
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-500/20 active:scale-95'
          }`}
          title="Buy Now"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Buy Now</span>
        </button>
      </div>

    </div>
  );
}
