import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, null, 1, true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, null, 1, false);
    navigate('/checkout');
  };

  return (
    <div className="group relative flex flex-col bg-[#0b101e] hover:bg-[#0f172a] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,102,255,0.15)] hover:-translate-y-1">
      {/* Clickable Image & Badges Container */}
      <Link to={`/product/${product.slug}`} className="relative block">
        <ProductImage
          src={product.image}
          name={product.name}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          className="h-44 w-full"
        />

        {/* Platform badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-400 border border-cyan-500/30 rounded-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50 rounded-md">
            {product.type}
          </span>
        </div>

        {/* Status / Discount Badges (Top Right) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-950/90 text-rose-300 border border-rose-500/40 rounded-md">
              Out of Stock
            </span>
          ) : hasDiscount ? (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-md shadow-sm">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600/80 text-blue-100 rounded-md">
              {product.tag}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Rating and Sales Count Row */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-semibold text-slate-200">{product.rating || '4.9'}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>{product.soldCount ? `${product.soldCount.toLocaleString()} sold` : '950+ sold'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-medium">
              {product.packages?.length || 1} {product.packages?.length === 1 ? 'pack' : 'options'}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} className="group-hover:text-cyan-300 transition-colors">
          <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mt-auto pt-2 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium">
            From
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-extrabold text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              title={isOutOfStock ? 'Item is out of stock' : 'Add to cart'}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/60"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,102,255,0.3)]"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
