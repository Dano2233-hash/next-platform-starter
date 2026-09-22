import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packagesCount = product.packages ? product.packages.length : 1;
  const lowestPrice = product.price;

  // Calculate discount percentage if oldPrice exists
  let discountPercent = 0;
  if (product.oldPrice && product.oldPrice > lowestPrice) {
    discountPercent = Math.round(((product.oldPrice - lowestPrice) / product.oldPrice) * 100);
  }

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  return (
    <div className="group relative bg-[#0a0f1d] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Out of Stock Overlay Badge */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs z-30 flex items-center justify-center p-4">
          <span className="px-3 py-1.5 bg-red-950/90 border border-red-500/50 text-red-300 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Out of Stock
          </span>
        </div>
      )}

      {/* Product Image Component */}
      <Link to={`/products/${product.slug}`} className="block">
        <ProductImage product={product} heightClass="h-44" />
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {product.soldCount || 0} sold
            </span>
          </div>

          {/* Title */}
          <Link to={`/products/${product.slug}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Package Count Badge */}
          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">
              {packagesCount} {packagesCount === 1 ? 'Package' : 'Packages'} available
            </span>
            {product.tag && (
              <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[10px] text-slate-400 font-medium">From</span>
            <span className="text-base font-black text-cyan-400 tracking-tight">
              {formatPrice(lowestPrice)}
            </span>
            {product.oldPrice && product.oldPrice > lowestPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Buttons Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5" /> Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> +Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
