import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Layers, Zap, ShoppingBag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const isOutOfStock = product.stock <= 0;
  const hasPackages = product.packages && product.packages.length > 0;

  // Calculate lowest price or product price
  const displayPrice = hasPackages
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const displayOldPrice = hasPackages
    ? product.packages[0]?.oldPrice
    : product.oldPrice;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (hasPackages) {
      // Navigate to details page to pick package
      navigate(`/products/${product.id}`);
    } else {
      addToCart(product);
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (hasPackages) {
      navigate(`/products/${product.id}`);
    } else {
      addToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative bg-[#090d1a] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative">
        <ProductImage product={product} className="h-44 sm:h-48" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Stock / Sale Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-red-600/90 text-white shadow-lg backdrop-blur-md">
              Out of Stock
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-lg">
              {product.tag}
            </span>
          ) : null}
        </div>

        {/* Packages Indicator Pill */}
        {hasPackages && (
          <div className="absolute bottom-2 right-2 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-full px-2 py-0.5 flex items-center gap-1 text-[10px] font-semibold text-slate-300">
            <Layers className="w-3 h-3 text-cyan-400" />
            {product.packages.length} Packages
          </div>
        )}
      </div>

      {/* Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount ? `${product.soldCount}+ sold` : 'In Demand'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3 min-h-[32px]">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                {hasPackages ? 'From' : 'Price'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-cyan-400">
                  {formatPrice(displayPrice)}
                </span>
                {displayOldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(displayOldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-2 px-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              Add
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-2 px-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-500/10 flex items-center justify-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
