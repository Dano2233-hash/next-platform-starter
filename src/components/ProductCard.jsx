import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages?.length || 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    navigate('/cart');
  };

  return (
    <div className="group relative bg-[#0b0f19] border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <Link to={`/products/${product.slug || product.id}`} className="block relative">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="h-44 sm:h-48"
          />

          {/* Badges Container */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            {/* Platform Badge */}
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-slate-700/80 backdrop-blur-md">
              {product.platform || 'Digital'}
            </span>

            {/* Discount / Tag Badge */}
            {isSale ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
                -{discountPercent}%
              </span>
            ) : product.tag ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-600/90 text-white backdrop-blur-md">
                {product.tag}
              </span>
            ) : null}
          </div>

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="px-3 py-1 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Category & Type */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-medium text-slate-400 uppercase tracking-wider">
              {product.type || 'Digital Item'}
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating || '5.0'}
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/products/${product.slug || product.id}`}
            className="text-base font-bold text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
            {product.description}
          </p>

          {/* Stats Bar (Sold count + Package count) */}
          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800/60">
            <span>{product.soldCount || 0} sold</span>
            <span className="text-cyan-300 font-medium">
              {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
              {formatPrice(product.price)}
            </span>
            {isSale && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-cyan-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
