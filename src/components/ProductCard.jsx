import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages?.length || 1;
  const hasDiscount = Boolean(product.oldPrice && product.oldPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product, product.packages?.[0] || null, 1);
      navigate('/checkout');
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, product.packages?.[0] || null, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between bg-[#0b101c] rounded-xl border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Image Container with badges */}
      <div className="relative">
        <ProductImage product={product} className="h-44 w-full" />

        {/* Top Floating Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {hasDiscount ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-black tracking-wide bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md">
                -{discountPercent}%
              </span>
            ) : product.tag ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-500/90 text-slate-950 shadow-md">
                {product.tag}
              </span>
            ) : null}
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 border border-slate-700/80 text-slate-200 backdrop-blur-md">
            {product.type || 'Digital'}
          </span>
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-md bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-400">{product.platform}</span>
            <span className="text-[11px] bg-slate-800/70 px-2 py-0.5 rounded text-slate-300">
              {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs border-t border-slate-800/60 pt-2.5 mb-3">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              {product.soldCount || 100}+ sold
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                From
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-extrabold text-cyan-400">
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

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCartClick}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyClick}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs transition-all duration-200 shadow-md shadow-cyan-950/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
