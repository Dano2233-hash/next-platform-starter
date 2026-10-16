import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCart } from '../hooks/useCart.jsx';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Determine starting price
  const startingPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const hasDiscount = product.oldPrice && product.oldPrice > startingPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - startingPrice) / product.oldPrice) * 100)
    : 0;

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

  return (
    <div className="group relative bg-[#0a0f1d] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20">
      <Link to={`/product/${product.slug}`} className="block flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative mb-3">
          <ProductImage product={product} className="h-44 w-full rounded-xl" />

          {/* Badges Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-cyan-400 backdrop-blur-md">
              {product.platform || 'Digital'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-purple-400 backdrop-blur-md">
              {product.type || 'Code'}
            </span>
          </div>

          {/* Badges Top Right */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
            {isOutOfStock ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-500 text-white shadow-md">
                Out of Stock
              </span>
            ) : hasDiscount ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md">
                -{discountPercent}%
              </span>
            ) : product.tag ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 shadow-md">
                {product.tag}
              </span>
            ) : null}
          </div>
        </div>

        {/* Info Content */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating ? product.rating.toFixed(1) : '5.0'}
              </span>
              <span>{product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Instant'}</span>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Pricing & Packages Count */}
          <div className="pt-2 border-t border-slate-800/80 flex items-end justify-between">
            <div>
              {product.packages && product.packages.length > 1 && (
                <span className="text-[10px] font-medium text-slate-400 block">
                  {product.packages.length} Packages Available
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] text-slate-400">From</span>
                <span className="text-base font-extrabold text-cyan-400">
                  {formatPrice(startingPrice)}
                </span>
              </div>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800/60">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          Add Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-950/40"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          Buy Now
        </button>
      </div>
    </div>
  );
};
