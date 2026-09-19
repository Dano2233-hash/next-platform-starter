import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Flame, Check, Zap } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const isOutOfStock = product.stock <= 0;

  // Find lowest price if packages exist
  let displayPrice = product.price;
  let oldPrice = product.oldPrice;

  if (product.packages && product.packages.length > 0) {
    const sortedPackages = [...product.packages].sort((a, b) => a.price - b.price);
    displayPrice = sortedPackages[0].price;
    if (sortedPackages[0].oldPrice) {
      oldPrice = sortedPackages[0].oldPrice;
    }
  }

  const hasDiscount = Boolean(oldPrice && oldPrice > displayPrice);
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - displayPrice) / oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Default to first package or product itself
    const selectedPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const selectedPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
    openCart();
  };

  const platformColors = {
    PC: 'bg-blue-950/80 text-blue-400 border-blue-800/50',
    PlayStation: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/50',
    Xbox: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50',
    Mobile: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/50',
    'Gift Card': 'bg-purple-950/80 text-purple-300 border-purple-800/50'
  };

  const typeColors = {
    Game: 'bg-slate-800/90 text-slate-200 border-slate-700/80',
    'Top-Up': 'bg-amber-950/80 text-amber-300 border-amber-800/50',
    'Gift Card': 'bg-purple-950/80 text-purple-300 border-purple-800/50',
    Subscription: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-800/50',
    Account: 'bg-blue-950/80 text-blue-300 border-blue-800/50'
  };

  return (
    <div className="group relative bg-[#0c0f17] hover:bg-[#131926] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-cyan-500/10">
      {/* Top Tag Badges over Image */}
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <ProductImage product={product} heightClass="h-44" />
        </Link>

        {/* Platform & Type Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border backdrop-blur-md shadow-md ${
                platformColors[product.platform] || 'bg-slate-900/90 text-slate-300 border-slate-700'
              }`}
            >
              {product.platform}
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border backdrop-blur-md shadow-md ${
                typeColors[product.type] || 'bg-slate-900/90 text-slate-300 border-slate-700'
              }`}
            >
              {product.type}
            </span>
          </div>

          {/* Discount badge */}
          {hasDiscount && !isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-500 rounded-md shadow-lg shadow-rose-600/30">
              -{discountPercent}%
            </span>
          )}

          {/* Custom Tag Badge */}
          {product.tag && !hasDiscount && !isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold text-cyan-300 bg-cyan-950/90 border border-cyan-700/60 rounded-md backdrop-blur-md shadow-md">
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/90 border border-red-800 rounded-lg shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Flame className="w-3 h-3 text-cyan-400" />
              <span>{product.soldCount || 0}+ sold</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-[12px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Packages Badge / Info */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            {product.packages && product.packages.length > 0
              ? `${product.packages.length} Packages Available`
              : 'Direct Code / Top-Up'}
          </span>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-[10px] font-semibold text-amber-400">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Pricing Block */}
        <div className="flex items-baseline justify-between gap-1 pt-1">
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
              {product.packages && product.packages.length > 1 ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-medium text-slate-500 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-500/20 text-cyan-300 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-90 text-white shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
