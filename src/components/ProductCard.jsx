import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, Check, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const isComingSoon = product.isComingSoon;
  const hasPackages = product.packages && product.packages.length > 0;

  // Calculate lowest price if packages exist
  const displayPrice = hasPackages
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  const displayOldPrice = hasPackages
    ? (product.packages[0]?.oldPrice || product.oldPrice)
    : product.oldPrice;

  const discountPercent = displayOldPrice && displayOldPrice > displayPrice
    ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
    : null;

  const handleQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;

    if (hasPackages) {
      navigate(`/product/${product.slug || product.id}`);
    } else {
      onAddToCart(product, null, 1);
      navigate('/checkout');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;

    if (hasPackages) {
      navigate(`/product/${product.slug || product.id}`);
    } else {
      onAddToCart(product, null, 1);
    }
  };

  return (
    <div className="group relative bg-[#0b0f19] hover:bg-[#111726] border border-slate-800/80 hover:border-blue-500/50 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-blue-900/10">

      {/* Top Media Container */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block overflow-hidden">
        <ProductImage product={product} className="h-44 w-full" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-blue-400">
            {product.platform || 'Digital'}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-cyan-400">
            {product.type || 'Product'}
          </span>
        </div>

        {/* Right Badges: Discount or Stock Tag */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 z-10">
          {discountPercent && (
            <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow">
              -{discountPercent}%
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-600 text-white shadow">
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of stock or coming soon overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-3 py-1 text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 rounded-full tracking-wider uppercase">
              Coming Soon
            </span>
          </div>
        )}
        {isOutOfStock && !isComingSoon && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-3 py-1 text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/80 rounded-full tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header metadata: Sold count + Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || 4.9}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Instant Delivery'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`} className="block">
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Package count indicator */}
          {hasPackages && (
            <div className="mb-2">
              <span className="inline-block text-[11px] text-blue-400 bg-blue-950/60 border border-blue-900/60 px-2 py-0.5 rounded font-medium">
                {product.packages.length} Option{product.packages.length > 1 ? 's' : ''} Available
              </span>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/60 mb-3">
            <div>
              <span className="text-xs text-slate-400 font-medium mr-1.5">
                {hasPackages ? 'From' : 'Price'}
              </span>
              <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {formatPrice(displayPrice)}
              </span>
            </div>
            {displayOldPrice && displayOldPrice > displayPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(displayOldPrice)}
              </span>
            )}
          </div>

          {/* Buttons CTA */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isComingSoon}
              className="w-full py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/60"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleQuickBuy}
              disabled={isOutOfStock || isComingSoon}
              className="w-full py-2 px-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Buy Now</span>
              <Zap className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
