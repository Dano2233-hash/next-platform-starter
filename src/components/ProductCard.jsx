import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ShoppingCart, Zap, Layers } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;
  const hasPackages = product.packages && product.packages.length > 0;

  // Find min price if packages exist
  let minPrice = product.price;
  let minOldPrice = product.oldPrice;
  if (hasPackages) {
    minPrice = Math.min(...product.packages.map(p => p.price));
    const packagesWithOld = product.packages.filter(p => p.oldPrice);
    if (packagesWithOld.length > 0) {
      minOldPrice = Math.min(...packagesWithOld.map(p => p.oldPrice));
    }
  }

  // Calculate discount percent
  let discountPercent = null;
  if (minOldPrice && minOldPrice > minPrice) {
    discountPercent = Math.round(((minOldPrice - minPrice) / minOldPrice) * 100);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasPackages) {
      navigate(`/product/${product.slug}`);
    } else {
      addToCart(product, null, 1);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasPackages) {
      navigate(`/product/${product.slug}`);
    } else {
      addToCart(product, null, 1);
      navigate('/checkout');
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 p-3 overflow-hidden">

      {/* Discount / Tag Badges */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-1 items-start">
        {discountPercent && (
          <span className="px-2 py-0.5 text-[11px] font-extrabold rounded bg-rose-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        )}
        {product.tag && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Out of Stock / Coming Soon Badge */}
      {isOutOfStock && (
        <div className="absolute top-5 right-5 z-20">
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900/90 text-rose-400 border border-rose-500/40">
            Out of Stock
          </span>
        </div>
      )}

      {/* Main Image Banner */}
      <Link to={`/product/${product.slug}`} className="block relative mb-3">
        <ProductImage product={product} className="h-44" />
      </Link>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount || 0} sold
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-2 font-normal leading-snug">
            {product.description}
          </p>
        </div>

        <div>
          {/* Package count badge if any */}
          {hasPackages && (
            <div className="inline-flex items-center gap-1 text-[11px] text-purple-300 bg-purple-950/60 border border-purple-500/30 rounded px-2 py-0.5 mb-2">
              <Layers className="w-3 h-3" />
              <span>{product.packages.length} Packages Available</span>
            </div>
          )}

          {/* Price area */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-extrabold text-cyan-400">
              {hasPackages ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice)}
            </span>
            {minOldPrice && minOldPrice > minPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(minOldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || product.isComingSoon}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-cyan-300 border border-slate-700/80 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || product.isComingSoon}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
