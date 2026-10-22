import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatProductPrice, formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (packageCount > 0) {
      // If product has packages, navigate to details page to choose package
      navigate(`/product/${product.slug || product.id}`);
    } else {
      addToCart(product, null, 1);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (packageCount > 0) {
      navigate(`/product/${product.slug || product.id}`);
    } else {
      addToCart(product, null, 1);
      navigate('/checkout');
    }
  };

  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top Media & Badges Container */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        <ProductImage product={product} heightClass="h-44" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-700/80 text-cyan-400 backdrop-blur-md">
            {product.platform || 'Multi'}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-700/80 text-purple-400 backdrop-blur-md">
            {product.type || 'Digital'}
          </span>
        </div>

        {/* Top Right Sale / Out of Stock Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-rose-600/90 text-white shadow-md">
              Out of Stock
            </span>
          ) : hasDiscount ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-600/90 text-white backdrop-blur-md">
              {product.tag}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Sold/Rating Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span>{product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'In stock'}</span>
            </div>
          </div>

          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom Section: Packages / Pricing & Actions */}
        <div>
          {/* Package Info Tag if packages exist */}
          {packageCount > 0 && (
            <div className="mb-2 flex items-center gap-1 text-[11px] font-medium text-cyan-400/90 bg-cyan-950/40 border border-cyan-800/40 rounded px-2 py-0.5 w-fit">
              <Layers className="w-3 h-3" />
              <span>{packageCount} Packages Available</span>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between mb-3 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Price</span>
              <span className="text-base font-extrabold text-cyan-300">
                {formatProductPrice(product)}
              </span>
            </div>
            {hasDiscount && (
              <div className="text-right">
                <span className="text-[11px] text-slate-500 line-through block">
                  {formatPrice(product.oldPrice)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-bold text-xs transition-all duration-200 border ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600 active:scale-95'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>{packageCount > 0 ? 'Select' : 'Add Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-bold text-xs transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
