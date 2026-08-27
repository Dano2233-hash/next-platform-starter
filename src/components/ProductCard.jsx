import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, PackageCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const {
    id,
    name,
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

  const discountPercent =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-[#0a0f1d] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 flex flex-col h-full">
      {/* Top Badges overlay */}
      <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1 max-w-[85%] pointer-events-none">
        {tag && (
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            {tag}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Stock badge */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-slate-950/80 z-20 backdrop-blur-[2px] flex items-center justify-center">
          <span className="bg-rose-950/90 text-rose-300 border border-rose-500/50 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Image Container */}
      <Link to={`/products/${id}`} className="block relative aspect-[16/9] w-full">
        <ProductImage
          src={image}
          alt={name}
          category={category}
          platform={platform}
          className="w-full h-full"
        />
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Badges line */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="bg-slate-900 border border-slate-700/80 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded">
            {platform}
          </span>
          <span className="bg-slate-900 border border-slate-700/80 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded">
            {type}
          </span>
          {packageCount > 0 && (
            <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
              <PackageCheck className="w-3 h-3 text-slate-400" />
              {packageCount} Packages
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/products/${id}`} className="group-hover:text-cyan-400 transition-colors">
          <h3 className="font-bold text-slate-100 text-base line-clamp-1 mb-1">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 flex-1">
          {description}
        </p>

        {/* Rating and Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {soldCount.toLocaleString()} sold
          </span>
        </div>

        {/* Price display */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {formatPrice(price)}
              </span>
              {oldPrice && oldPrice > price && (
                <span className="text-xs text-slate-400 line-through font-normal">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/70 hover:border-slate-600 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Cart</span>
          </button>

          <button
            onClick={() => onBuyNow && onBuyNow(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-bold shadow-md shadow-cyan-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
