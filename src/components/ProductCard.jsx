import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, openDrawer } = useCart();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 0;
  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Default to first package or base product
    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    openDrawer();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const defaultPackage = packageCount > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#090e1d] hover:bg-[#0c142b] border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30">
      <Link to={`/products/${product.slug}`} className="block relative">
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
            {product.platform}
          </span>
          {/* Type Badge */}
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide bg-slate-900/90 text-slate-300 border border-slate-700/60 backdrop-blur-sm">
            {product.type}
          </span>
        </div>

        {/* Right side status badges: Sale / Out of stock */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col items-end gap-1 pointer-events-none">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-red-600/95 text-white shadow-md">
              Out of Stock
            </span>
          ) : hasSale ? (
            <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 text-white shadow-md">
              {product.tag}
            </span>
          ) : null}
        </div>

        {/* Product Image */}
        <ProductImage
          src={product.image}
          alt={product.name}
          productName={product.name}
          category={product.category}
          platform={product.platform}
        />
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating, Sold Count & Packages */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating?.toFixed(1) || '5.0'}</span>
              <span className="text-slate-500 font-normal">({product.soldCount}+ sold)</span>
            </div>
            {packageCount > 1 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700/50">
                {packageCount} Packages
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {hasSale && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 font-semibold">
                <Check className="w-3 h-3" /> Instant
              </span>
            </div>
          </div>

          {/* Buttons: Buy and Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600'
              }`}
              title="Add to cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-cyan-900/30 hover:shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
