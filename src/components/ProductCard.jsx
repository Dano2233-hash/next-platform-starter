import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, Check, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;
  const packagesCount = product.packages ? product.packages.length : 1;
  const packageLabel = packagesCount > 1 ? `${packagesCount} Packages` : '1 Package';

  // Calculate discount percentage if old price exists
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Top Image area */}
      <Link to={`/product/${product.slug}`} className="block relative flex-shrink-0">
        <ProductImage
          image={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          className="h-44 w-full"
        />

        {/* Badges on image overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.platform && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                {product.type}
              </span>
            )}
          </div>

          {/* Discount badge */}
          {discountPercent && !isOutOfStock && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Tag ribbon if available */}
        {product.tag && (
          <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/90 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-wider shadow-xl">
              <AlertCircle className="w-4 h-4" /> Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Content body */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Rating and Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-slate-200 font-semibold">{product.rating || 5.0}</span>
              <span className="text-slate-500">({product.soldCount || 0} sold)</span>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded font-mono">
              {packageLabel}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="text-sm font-bold text-slate-100 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          {/* Price display */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Starting from</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-cyan-300">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 active:scale-95'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white active:scale-95 glow-cyan'
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
}
