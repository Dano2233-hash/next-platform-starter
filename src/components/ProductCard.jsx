import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    setIsCartOpen(true);
  };

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 overflow-hidden">
      {/* Product Image & Badges */}
      <Link to={`/products/${product.slug || product.id}`} className="block relative overflow-hidden">
        <ProductImage
          src={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          type={product.type}
          className="w-full h-44 sm:h-48 rounded-t-2xl"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && !isOutOfStock && (
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-600 text-white shadow-md animate-pulse">
            -{discountPercent}%
          </div>
        )}

        {/* Out of stock badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || '4.9'}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {product.soldCount || 0}+ sold
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug || product.id}`} className="group-hover:text-cyan-400 transition-colors">
          <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Packages indicator */}
        {product.packages && product.packages.length > 0 && (
          <div className="text-[11px] text-slate-400 mb-3 bg-slate-950/50 rounded-lg px-2 py-1 inline-flex items-center gap-1 border border-slate-800/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>{product.packages.length} Packages Available</span>
          </div>
        )}

        {/* Footer: Price & Buttons */}
        <div className="mt-auto pt-3 border-t border-slate-800/80 flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase text-slate-400">
                {product.packages?.length > 1 ? 'From' : 'Price'}
              </span>
              <span className="text-base sm:text-lg font-black text-cyan-400 tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs line-through text-slate-400 font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/50 active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-cyan-950/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
