import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Eye, ShieldCheck, Zap } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
  };

  return (
    <div className="group relative bg-[#090d1a] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between overflow-hidden">

      {/* Product Image and Badges */}
      <div className="p-3 relative">
        <Link to={`/product/${product.slug || product.id}`} className="block relative">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="w-full h-44 object-cover rounded-xl"
          />

          {/* Overlays / Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
            {product.platform && (
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 border border-slate-700/80 text-cyan-300 backdrop-blur-md">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-purple-950/80 border border-purple-800/60 text-purple-300 backdrop-blur-md">
                {product.type}
              </span>
            )}
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10 items-end">
            {isSale && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-600 text-white shadow-md shadow-rose-900/40">
                -{discountPercent}%
              </span>
            )}
            {product.tag && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/90 text-slate-950 uppercase tracking-wider">
                {product.tag}
              </span>
            )}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-20">
              <span className="px-3 py-1.5 rounded-lg bg-rose-950/90 border border-rose-700 text-rose-300 font-bold text-xs uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Details Section */}
      <div className="px-4 pb-4 pt-1 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Stats Row: Sold Count & Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
          <span className="flex items-center gap-1 font-medium text-slate-300">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{product.rating || 4.9}</span>
          </span>
          <span className="text-slate-400">
            {product.soldCount ? `${product.soldCount} sold` : 'Fast Delivery'}
          </span>
          {product.packages && product.packages.length > 0 && (
            <span className="text-cyan-400/80 font-medium">
              {product.packages.length} option{product.packages.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400">From</span>
            <span className="text-base font-extrabold text-cyan-400 font-heading">
              {formatPrice(product.price)}
            </span>
            {isSale && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-900/30'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" /> Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" /> +Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
