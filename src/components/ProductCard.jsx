import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const hasDiscount = Boolean(product.oldPrice && product.oldPrice > product.price);

  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between bg-[#0a0f1d] border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      {/* Upper Media Container */}
      <div>
        <div className="relative">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md bg-slate-900/90 text-cyan-400 border border-cyan-500/40 backdrop-blur-md shadow">
              {product.platform}
            </span>

            {isOutOfStock ? (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950/90 text-red-400 border border-red-500/40">
                Out of Stock
              </span>
            ) : hasDiscount ? (
              <span className="px-2 py-0.5 text-[10px] font-black rounded bg-gradient-to-r from-red-600 to-pink-600 text-white shadow">
                -{discountPercent}% OFF
              </span>
            ) : product.tag ? (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-purple-900/90 text-purple-200 border border-purple-500/30">
                {product.tag}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 flex flex-col gap-2">
          {/* Platform & Type Subheader */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="text-purple-400 font-semibold uppercase">{product.type}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating || '4.9'}</span>
              <span className="text-slate-500 text-[10px]">({product.soldCount || 0} sold)</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-base line-clamp-1">{product.name}</h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 min-h-[32px]">
            {product.description}
          </p>

          {/* Package Count Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{packageCount} {packageCount === 1 ? 'Option' : 'Packages Available'}</span>
          </div>
        </div>
      </div>

      {/* Footer Pricing & Action Buttons */}
      <div className="p-4 pt-0 mt-auto border-t border-slate-800/60 pt-3 flex flex-col gap-3">
        {/* Pricing */}
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Starting from</span>
            <span className="text-base font-extrabold text-cyan-300">
              {formatPrice(product.price)}
            </span>
          </div>

          {hasDiscount && (
            <span className="text-xs text-slate-500 line-through font-medium">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={() => onBuyNow && onBuyNow(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
