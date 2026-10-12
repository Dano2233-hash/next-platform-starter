import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discount = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/cart');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  return (
    <div className="group relative bg-[#0a0f24] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1">
      <Link to={`/products/${product.slug || product.id}`} className="block flex-1 flex flex-col">
        {/* Top Image Box */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="w-full h-full"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-blue-400 backdrop-blur-md">
                {product.platform}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-cyan-400 backdrop-blur-md">
                {product.type}
              </span>
            </div>

            {isSale && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-600/90 text-white shadow-md shadow-red-600/30">
                -{discount}%
              </span>
            )}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
              <span className="px-3 py-1 rounded-lg bg-red-950 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Meta Info: Rating & Sold Count / Packages */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-slate-500">({product.soldCount || 100}+ sold)</span>
            </div>

            {packageCount > 0 && (
              <span className="text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-md">
                {packageCount} Packages
              </span>
            )}
          </div>

          {/* Price Box */}
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                {packageCount > 0 ? 'From' : 'Price'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-100">
                  {formatPrice(product.price)}
                </span>
                {isSale && (
                  <span className="text-xs font-medium text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Buttons Action Bar */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/20 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5" />
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-50 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700/60 transition-all active:scale-95"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          Add
        </button>
      </div>
    </div>
  );
}
