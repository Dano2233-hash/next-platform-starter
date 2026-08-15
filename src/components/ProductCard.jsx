import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  const isOut = product.stock <= 0;
  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (isOut) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
      navigate('/checkout');
    }
  };

  const handleAddCartClick = (e) => {
    e.stopPropagation();
    if (isOut) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#0d1322] border border-slate-800/80 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image & Top Badges */}
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="bg-slate-900/90 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.platform}
          </span>
          <span className="bg-slate-900/90 backdrop-blur-md text-purple-400 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.type}
          </span>
        </div>

        {/* Custom Tag / Sale Badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {hasSale && (
            <span className="bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}
          {product.tag && !hasSale && (
            <span className="bg-blue-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-md">
              {product.tag}
            </span>
          )}
        </div>

        {/* Stock Overlay if Out of Stock */}
        {isOut && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-slate-400 font-medium">
              {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Popular'}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Package Count indicator */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 border-t border-slate-800/60 pt-2.5">
          <span className="text-slate-400">
            {packageCount > 0 ? `${packageCount} Options Available` : 'Instant Delivery'}
          </span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Digital Key
          </span>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <div>
            <div className="text-[10px] text-slate-400 font-medium">
              {packageCount > 1 ? 'From' : 'Price'}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {formatPrice(product.price)}
              </span>
              {hasSale && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddCartClick}
              disabled={isOut}
              title="Add to Cart"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 rounded-lg transition-colors border border-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={handleBuyClick}
              disabled={isOut}
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
