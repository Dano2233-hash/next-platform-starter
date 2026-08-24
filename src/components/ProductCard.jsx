import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

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
    tag,
  } = product;

  const isOutOfStock = stock <= 0;
  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const packageCount = packages.length;

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNowClick = (e) => {
    e.stopPropagation();
    if (!isOutOfStock && onBuyNow) {
      onBuyNow(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <ProductImage
          src={image}
          name={name}
          category={category}
          platform={platform}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {platform}
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {type}
            </span>
          </div>

          {hasDiscount && (
            <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs px-2 py-0.5 rounded-md shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Tag Overlay */}
        {tag && !hasDiscount && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow">
              {tag}
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="bg-red-900/90 text-red-200 border border-red-500/40 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Main Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Sold & Rating Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-400">
              {soldCount.toLocaleString()} sold
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          {/* Package Count Badge */}
          {packageCount > 1 && (
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded-md mb-2">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span>{packageCount} Packages available</span>
            </div>
          )}

          {/* Price Block */}
          <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 block -mb-0.5">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <span className="text-lg font-extrabold text-cyan-300">
                {formatPrice(price)}
              </span>
            </div>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCartClick}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition ${
                isOutOfStock
                  ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              disabled={isOutOfStock}
              onClick={handleBuyNowClick}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold shadow-md transition ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
