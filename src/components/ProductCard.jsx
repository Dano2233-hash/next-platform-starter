import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle, Flame } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const packageCount = product.packages?.length || 0;

  // Calculate discount percentage if old price exists
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
      navigate('/checkout');
    }
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
    <div className="group relative bg-[#0c101c] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300">

      {/* Top Badges overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          {/* Type Badge */}
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-slate-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Discount or Custom Tag */}
        {hasDiscount ? (
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30">
            -{discountPercent}%
          </span>
        ) : product.tag ? (
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Product Link wrapper */}
      <Link to={`/product/${product.slug}`} className="block p-3 pb-0 flex-1">
        {/* Out of stock overlay badge if stock === 0 */}
        <div className="relative">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            heightClass="h-44"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
              <span className="px-3 py-1 bg-red-600/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-md border border-red-500 shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info Content */}
        <div className="mt-3 flex flex-col">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-400 font-medium">
              {product.soldCount > 0 ? `${product.soldCount.toLocaleString()} sold` : 'New arrival'}
            </span>
          </div>

          <h3 className="text-white font-bold text-base leading-snug group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-slate-400 text-xs mt-1 line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-2 text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            {packageCount > 0 ? `${packageCount} Packages available` : 'Standard key'}
          </div>
        </div>
      </Link>

      {/* Pricing and Action Buttons */}
      <div className="p-3 pt-2 mt-auto border-t border-slate-800/60 bg-slate-950/40">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-0.5">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-cyan-400 font-extrabold text-base">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-slate-500 line-through text-xs">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-[#1] grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`w-full py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-600/20 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
