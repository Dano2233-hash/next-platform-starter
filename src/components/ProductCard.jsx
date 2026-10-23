import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  const lowestPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const isSale = product.oldPrice && product.oldPrice > lowestPrice;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - lowestPrice) / product.oldPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    navigate('/checkout');
  };

  const platformBg = {
    PC: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    Xbox: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    PlayStation: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Mobile: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Gift Card': 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }[product.platform] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-3.5 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10">
      <Link to={`/product/${product.slug || product.id}`} className="block">
        {/* Top Image & Badges Container */}
        <div className="relative mb-3">
          <ProductImage product={product} className="h-44" />

          {/* Platform Badge (Top-Left) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-md ${platformBg}`}>
              {product.platform}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-950/80 text-slate-300 border-slate-700 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Discount Badge / Out of Stock (Top-Right) */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
            {isOutOfStock ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-600/90 text-white uppercase tracking-wider shadow-md">
                Out of Stock
              </span>
            ) : isSale ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md">
                -{discountPercent}% OFF
              </span>
            ) : product.tag ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                {product.tag}
              </span>
            ) : null}
          </div>
        </div>

        {/* Product Details */}
        <div className="px-1">
          <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mb-2 min-h-[2rem]">
            {product.description}
          </p>

          {/* Meta Info Row: Rating, Sold Count, Packages */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800/80">
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-200">{product.rating || '5.0'}</span>
              <span className="text-slate-500">({product.soldCount || 0} sold)</span>
            </div>
            {product.packages && product.packages.length > 0 && (
              <span className="text-[11px] font-medium text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {product.packages.length} {product.packages.length === 1 ? 'Option' : 'Packages'}
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">From</span>
              <span className="text-lg font-black text-cyan-400 tracking-tight">
                {formatPrice(lowestPrice)}
              </span>
            </div>
            {isSale && (
              <span className="text-xs text-slate-500 line-through font-semibold">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 text-xs font-bold transition-all border border-slate-700/80 hover:border-slate-600"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/20"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
