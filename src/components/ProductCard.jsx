import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Zap, Check } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart, onBuyNow }) {
  const {
    id,
    name,
    category,
    platform,
    type,
    price,
    oldPrice,
    image,
    packages,
    stock,
    rating,
    soldCount,
    tag
  } = product;

  const isOutOfStock = stock <= 0;
  const discountPercent = oldPrice && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  const packageCount = packages ? packages.length : 1;

  return (
    <div className="bg-[#090d16] border border-slate-800/90 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col group relative">

      {/* Top Image area */}
      <div className="relative">
        <ProductImage
          src={image}
          alt={name}
          category={category}
          platform={platform}
          heightClass="h-44 sm:h-48"
        />

        {/* Platform Badge */}
        <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
          {platform}
        </span>

        {/* Type Badge */}
        <span className="absolute top-2.5 right-2.5 bg-slate-900/90 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
          {type}
        </span>

        {/* Discount Badge / Custom Tag */}
        {discountPercent ? (
          <span className="absolute bottom-2.5 left-2.5 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow animate-pulse">
            -{discountPercent}%
          </span>
        ) : tag ? (
          <span className="absolute bottom-2.5 left-2.5 bg-cyan-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
            {tag}
          </span>
        ) : null}

        {/* Out of Stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-950/90 border border-rose-600/50 text-rose-300 font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          {/* Sold count & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star class="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating || 5.0}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              <span>{soldCount || 0} sold</span>
              <span className="mx-1">•</span>
              <span className="text-cyan-400/90">{packageCount} {packageCount === 1 ? 'pack' : 'packs'}</span>
            </div>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block -mb-0.5">
            {packageCount > 1 ? 'From' : 'Price'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-cyan-400">
              {formatPrice(price)}
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded-lg transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart class="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={() => onBuyNow && onBuyNow(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-bold py-2 px-2 rounded-lg transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
          >
            <Zap class="w-3.5 h-3.5" />
            <span>Buy</span>
          </button>
        </div>

      </div>
    </div>
  );
}
