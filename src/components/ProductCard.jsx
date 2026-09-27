import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    id,
    name,
    slug,
    category,
    platform,
    type,
    price,
    oldPrice,
    description,
    image,
    packages = [],
    stock = 0,
    rating = 5.0,
    soldCount = 0,
    tag
  } = product;

  const isOutOfStock = stock <= 0;
  const packageCount = packages.length;
  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleCardClick = (e) => {
    // If user clicked buttons, stop bubbling
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/product/${slug || id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else if (onAddToCart) {
      onAddToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#090d1a] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Top Image Box */}
      <div className="relative w-full overflow-hidden">
        <ProductImage
          src={image}
          alt={name}
          name={name}
          category={category}
          platform={platform}
          type={type}
        />

        {/* Platform Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700/80 text-cyan-400 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            {platform || 'Digital'}
          </span>
          <span className="px-2 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 text-blue-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {type || 'Game'}
          </span>
        </div>

        {/* Tag / Discount Badge (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
          {hasDiscount && (
            <span className="px-2 py-1 rounded-md bg-rose-600 text-white font-black text-xs shadow-md">
              -{discountPercent}%
            </span>
          )}
          {tag && !hasDiscount && (
            <span className="px-2 py-1 rounded-md bg-purple-600 text-white font-bold text-[11px] uppercase tracking-wide shadow-md">
              {tag}
            </span>
          )}
        </div>

        {/* Out of stock overlay badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-4 py-1.5 rounded-full bg-red-600/90 text-white font-extrabold text-xs uppercase tracking-widest border border-red-400 shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span>{soldCount.toLocaleString()} sold</span>
              {packageCount > 1 && (
                <span className="text-cyan-400 font-semibold">• {packageCount} Options</span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-slate-100 font-extrabold text-base line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block -mb-0.5">
                {packageCount > 1 ? 'Starting From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-cyan-400 font-black text-lg">
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <span className="text-slate-400 line-through text-xs font-medium">
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="w-full py-2 px-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-bold hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add Cart</span>
            </button>

            <button
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className="w-full py-2 px-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white text-xs font-extrabold hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
