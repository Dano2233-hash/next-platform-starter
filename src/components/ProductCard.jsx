import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const pkgCount = product.packages ? product.packages.length : 1;
  const isAvailable = product.stock !== false;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex flex-col bg-[#0c1021] border border-[#1a223e] rounded-xl overflow-hidden card-hover cursor-pointer h-full"
    >
      {/* Product Image Header with Badges */}
      <div className="relative">
        <ProductImage product={product} className="h-44 w-full" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none z-10">
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
              {product.platform || 'PC'}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
              {product.type || 'Game'}
            </span>
          </div>

          {product.oldPrice && product.oldPrice > product.price && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Stock status overlay badge */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-950/80 text-red-400 border border-red-800 text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title & Tag */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Metrics row: rating, sold, packages */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || 5.0}</span>
            </div>
            <span>{product.soldCount || 100}+ sold</span>
            <span className="text-cyan-400 font-medium">{pkgCount} {pkgCount === 1 ? 'Package' : 'Packages'}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">From</span>
              <span className="text-base font-extrabold text-cyan-400">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!isAvailable}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
