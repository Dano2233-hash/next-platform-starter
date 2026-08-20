import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Package } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  const packages = product.packages || [];
  const minPrice = packages.length > 0
    ? Math.min(...packages.map((p) => p.price))
    : product.price;

  const firstPkgWithOldPrice = packages.find((p) => p.oldPrice > p.price);
  const oldPrice = firstPkgWithOldPrice ? firstPkgWithOldPrice.oldPrice : product.oldPrice;

  const discountPercent = oldPrice && minPrice < oldPrice
    ? Math.round(((oldPrice - minPrice) / oldPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;

  const getPlatformBadgeColor = (plat) => {
    switch (plat) {
      case 'PC':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-700/50';
      case 'PlayStation':
        return 'bg-blue-950/80 text-blue-400 border-blue-700/50';
      case 'Xbox':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50';
      case 'Mobile':
        return 'bg-purple-950/80 text-purple-400 border-purple-700/50';
      default:
        return 'bg-amber-950/80 text-amber-400 border-amber-700/50';
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      if (onAddToCart) onAddToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#0d1322] border border-slate-800/80 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative w-full overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-wider ${getPlatformBadgeColor(product.platform)}`}>
              {product.platform}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900/90 text-slate-300 border border-slate-700 uppercase tracking-wider">
              {product.type}
            </span>
          </div>

          {discountPercent > 0 && !product.isComingSoon && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-red-600 text-white shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Special Tag or Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-red-950/90 text-red-400 border border-red-700/60 rounded-md font-bold text-xs uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {product.isComingSoon && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-amber-950/90 text-amber-400 border border-amber-700/60 rounded-md font-bold text-xs uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Sold Count Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            {product.soldCount > 0 && (
              <span className="text-[11px] text-slate-500 font-medium">
                {product.soldCount.toLocaleString()} sold
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-sm md:text-base group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Packages Info */}
          {packages.length > 1 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2 bg-slate-900/60 px-2 py-1 rounded border border-slate-800/60 w-fit">
              <Package className="w-3 h-3 text-cyan-400" />
              <span>{packages.length} Options Available</span>
            </div>
          )}

          {/* Price Display */}
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-base md:text-lg font-black text-cyan-400">
              {formatPrice(minPrice)}
            </span>
            {oldPrice > minPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || product.isComingSoon}
              className="w-full py-2 px-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || product.isComingSoon}
              className="w-full py-2 px-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md flex items-center justify-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Buy Now"
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
