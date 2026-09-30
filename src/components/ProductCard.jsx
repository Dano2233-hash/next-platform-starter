import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, Layers, Check, Flame } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

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
    tag,
    isFlashDeal,
    isComingSoon = false,
  } = product;

  // Calculate lowest price if packages exist
  const minPrice = packages.length > 0 ? Math.min(...packages.map((p) => p.price)) : price;
  const packageCount = packages.length;

  // Calculate discount percentage if old price is present
  const discountPercent = oldPrice && oldPrice > minPrice
    ? Math.round(((oldPrice - minPrice) / oldPrice) * 100)
    : 0;

  const isOutOfStock = stock <= 0 && !isComingSoon;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;
    const defaultPackage = packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;
    const defaultPackage = packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#0c1024] border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
      {/* Product Image and Overlay Badges */}
      <Link to={`/product/${id}`} className="relative block overflow-hidden">
        <ProductImage
          src={image}
          name={name}
          category={category}
          platform={platform}
          type={type}
          heightClass="h-44 sm:h-48"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none z-10">
          <div className="flex flex-wrap gap-1 items-center">
            {/* Platform badge */}
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {platform || 'PC'}
            </span>
            {/* Type badge */}
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
              {type || 'Top-Up'}
            </span>
          </div>

          {/* Special Tags (Flash Deal / Discount / Tag) */}
          <div className="flex items-center gap-1">
            {discountPercent > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded bg-rose-600 text-white shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {tag && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md hidden sm:inline-block">
                {tag}
              </span>
            )}
          </div>
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
        )}
      </Link>

      {/* Content Info */}
      <div className="flex flex-col flex-grow p-4 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{rating}</span>
          </div>
          <span className="text-slate-400 font-medium">{soldCount} Sold</span>
        </div>

        <Link to={`/product/${id}`} className="block group-hover:text-cyan-400 transition-colors">
          <h3 className="text-sm sm:text-base font-bold text-slate-100 line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-slate-400 line-clamp-2 min-h-[2rem]">
          {description}
        </p>

        {/* Package info badge */}
        {packageCount > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 w-fit">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{packageCount} Packages available</span>
          </div>
        )}

        {/* Price Row */}
        <div className="pt-2 border-t border-slate-800/80 mt-auto flex items-end justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              {packageCount > 1 ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-cyan-300">
                {formatPrice(minPrice)}
              </span>
              {oldPrice && oldPrice > minPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock || isComingSoon}
            className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/10"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isComingSoon}
            className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-700/80 font-semibold text-xs flex items-center justify-center gap-1 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
