import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Check, PackageCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0;

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
      navigate('/checkout');
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product);
  };

  return (
    <div className="group bg-[#090d16] border border-slate-800 hover:border-blue-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 relative">
      <div>
        {/* Top Badges overlay */}
        <div className="relative">
          <Link to={`/product/${product.slug || product.id}`}>
            <ProductImage
              image={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-48"
            />
          </Link>

          {/* Platform Badge */}
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-slate-900/90 text-cyan-400 border border-slate-700/80 rounded-md backdrop-blur-md shadow">
            {product.platform || 'Digital'}
          </span>

          {/* Type Badge / Discount Badge */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            {discountPercent && (
              <span className="px-2 py-0.5 text-xs font-black bg-rose-600 text-white rounded-md shadow animate-pulse">
                -{discountPercent}%
              </span>
            )}
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800/60 rounded-md backdrop-blur-md">
              {product.type || 'Digital'}
            </span>
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800 rounded-lg shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>

            <div className="flex items-center gap-2">
              {product.packages && product.packages.length > 1 && (
                <span className="flex items-center gap-0.5 text-slate-400 text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded">
                  <PackageCheck className="w-3 h-3 text-cyan-400" />
                  {product.packages.length} Packs
                </span>
              )}
              <span className="text-slate-400 text-[11px]">
                {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Popular'}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug || product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="text-base font-bold text-slate-100 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
            {product.description}
          </p>

          {/* Pricing Block */}
          <div className="pt-2 border-t border-slate-800/60 flex items-baseline gap-2">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-lg font-extrabold text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>

        <button
          onClick={handleBuyNowClick}
          disabled={isOutOfStock}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Buy Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
