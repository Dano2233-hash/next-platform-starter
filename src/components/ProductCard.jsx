import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  // Calculate lowest price if packages exist
  let displayPrice = product.price;
  if (product.packages && product.packages.length > 0) {
    const minPkgPrice = Math.min(...product.packages.map((p) => p.price));
    displayPrice = minPkgPrice;
  }

  const packageCount = product.packages ? product.packages.length : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;

    // Default to first package if available
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;

    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">

      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-slate-950/80 border border-slate-700/80 text-cyan-300 backdrop-blur-md">
            {product.platform}
          </span>
          {/* Type Badge */}
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-slate-950/80 border border-slate-700/80 text-slate-300 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Discount Badge */}
        {product.oldPrice && product.oldPrice > displayPrice && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-500 text-white shadow-md animate-pulse">
            SALE
          </span>
        )}
      </div>

      {/* Out of stock banner overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-slate-950/80 z-30 flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Out of Stock
          </span>
        </div>
      )}

      {/* Card Clickable Link Area */}
      <Link to={`/products/${product.slug}`} className="flex-1 flex flex-col">
        {/* Product Image */}
        <ProductImage product={product} />

        {/* Product Info Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Title */}
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-sm line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-800/60">
            {/* Stats Row: Rating, Sold Count, Packages */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200">{product.rating || 5.0}</span>
              </div>
              <div>{product.soldCount ? `${product.soldCount}+ sold` : 'Available'}</div>
              {packageCount > 1 && (
                <div className="text-cyan-400 font-semibold">{packageCount} Options</div>
              )}
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400">From</span>
              <span className="text-base font-extrabold text-cyan-400">
                {formatPrice(displayPrice)}
              </span>
              {product.oldPrice && product.oldPrice > displayPrice && (
                <span className="text-xs text-slate-500 line-through font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons Footer */}
      <div className="p-3 pt-0 grid grid-cols-2 gap-2 z-20">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700/80 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-extrabold shadow-md hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          title="Buy Now"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Buy Now</span>
        </button>
      </div>

    </div>
  );
}
