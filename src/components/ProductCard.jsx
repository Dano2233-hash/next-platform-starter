import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const lowestPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  const hasDiscount = product.oldPrice && product.oldPrice > lowestPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - lowestPrice) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages ? product.packages[0] : null, 1, true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages ? product.packages[0] : null, 1, false);
    navigate('/checkout');
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="group relative flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-3 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 cursor-pointer"
    >
      <div>
        {/* Top Media Container */}
        <div className="relative mb-3">
          <ProductImage
            src={product.image}
            alt={product.name}
            name={product.name}
            category={product.category}
            platform={product.platform}
            className="h-44 sm:h-48 w-full rounded-xl"
          />

          {/* Platform Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-slate-950/80 text-cyan-400 border border-cyan-800/50 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Discount or Out of Stock Badge */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
            {isOutOfStock ? (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-rose-950/90 text-rose-300 border border-rose-800/80 shadow-md">
                Out of Stock
              </span>
            ) : hasDiscount ? (
              <span className="px-2 py-0.5 text-[11px] font-black uppercase rounded-md bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-950/60 animate-pulse">
                -{discountPercent}%
              </span>
            ) : product.tag ? (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60">
                {product.tag}
              </span>
            ) : null}
          </div>
        </div>

        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-0.5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{Number(product.rating || 5.0).toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{product.soldCount || 100}+ sold</span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">{packageCount} {packageCount === 1 ? 'option' : 'options'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1 px-0.5">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 px-0.5 min-h-[32px]">
          {product.description}
        </p>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-2 border-t border-slate-800/80 mt-auto">
        <div className="flex items-baseline gap-2 mb-3 px-0.5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-500">
              {packageCount > 1 ? 'From' : 'Price'}
            </span>
            <span className="text-base font-extrabold text-cyan-400">
              {formatPrice(lowestPrice)}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-xs text-slate-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Buttons: Buy Now & Add to Cart */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-md shadow-cyan-950/40 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Buy Now
          </button>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`py-2 px-2 rounded-xl font-semibold text-xs border flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 hover:border-cyan-500/40 text-slate-200 active:scale-95'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
