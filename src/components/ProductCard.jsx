import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, ShieldCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product);
    navigate('/checkout');
  };

  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const isOutOfStock = Number(product.stock) <= 0;

  // Platform badge styles
  const getPlatformBadgeColor = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'xbox':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'playstation':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'mobile':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'gift card':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="group relative bg-[#0b1120] border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between">
      <Link to={`/product/${product.slug}`} className="block flex-1">
        {/* Top Image area */}
        <div className="relative">
          <ProductImage product={product} height="h-44" />

          {/* Platform & Type Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded border backdrop-blur-md ${getPlatformBadgeColor(
                product.platform
              )}`}
            >
              {product.platform}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Discount or Out of Stock Tag */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 items-end">
            {isOutOfStock ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/90 text-white shadow-md">
                Out of Stock
              </span>
            ) : isSale ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white shadow-md">
                -{discountPercent}%
              </span>
            ) : product.tag ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-600/90 text-white shadow-md">
                {product.tag}
              </span>
            ) : null}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Rating & Sold count */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <div className="flex items-center gap-1 text-amber-400 font-medium">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>
              <span className="text-slate-400">
                {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Fast delivery'}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>
          </div>

          {/* Pricing & Packages */}
          <div className="pt-2 border-t border-slate-800/60 mt-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-slate-400">
                {product.packages && product.packages.length > 1
                  ? `${product.packages.length} Packages Available`
                  : 'Standard Digital Key'}
              </span>
              {isSale && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 mr-1">From</span>
                <span className="text-lg font-black text-cyan-400 tracking-tight font-mono">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border ${
            isOutOfStock
              ? 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700 hover:border-slate-600 active:scale-98'
          }`}
          title="Add to cart"
        >
          <ShoppingCart size={14} />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
            isOutOfStock
              ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-950/40 active:scale-98'
          }`}
          title="Buy Now"
        >
          <Zap size={14} className="fill-slate-950" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
