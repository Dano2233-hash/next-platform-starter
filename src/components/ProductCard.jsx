import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const minPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages?.[0] || { name: 'Standard', price: minPrice };
    addToCart(product, defaultPkg, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages?.[0] || { name: 'Standard', price: minPrice };
    addToCart(product, defaultPkg, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#0b0f1d] border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30">
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1.5 items-center">
        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
          {product.platform || 'Digital'}
        </span>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
          {product.type || 'Item'}
        </span>
      </div>

      {/* Sale / Out of stock badges */}
      <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1 items-end">
        {isOutOfStock ? (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950/90 text-red-400 border border-red-800 backdrop-blur-md">
            Out of Stock
          </span>
        ) : hasSale ? (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-red-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        ) : product.tag ? (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative group-hover:opacity-95 transition-opacity">
        <ProductImage product={product} className="h-44 w-full" />
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || '4.9'}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Instant'}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Package info */}
        {product.packages && product.packages.length > 0 && (
          <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            <span>{product.packages.length} package options available</span>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-800/80">
          {/* Price */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 block leading-none">Starting from</span>
              <span className="text-base font-extrabold text-cyan-400">
                {formatPrice(minPrice)}
              </span>
            </div>
            {hasSale && (
              <span className="text-xs text-slate-500 line-through font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-extrabold text-xs transition shadow-md shadow-cyan-950/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
