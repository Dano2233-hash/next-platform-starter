import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage if old price exists
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
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
    <div className="group relative bg-[#090e1c] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col justify-between">

      {/* Upper Thumbnail Section */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-slate-950">

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1.5 items-center max-w-[85%]">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Tag / Sale Badge */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col items-end gap-1">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white">
              {product.tag}
            </span>
          )}
        </div>

        {/* Product Image Component */}
        <div className="h-44 w-full overflow-hidden flex items-center justify-center">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="w-full h-44 object-cover"
          />
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-30 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-red-600/90 text-white text-xs font-bold rounded-lg border border-red-400 uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {product.soldCount ? `${product.soldCount}+ sold` : 'In Stock'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[2rem]">
            {product.description}
          </p>

          {/* Package Count indicator if applicable */}
          {product.packages && product.packages.length > 1 && (
            <div className="mt-2 text-[11px] font-semibold text-cyan-400/90 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {product.packages.length} Packages Available
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">

          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-slate-400 font-medium">
                {product.packages && product.packages.length > 1 ? 'From' : ''}
              </span>
              <span className="text-base font-extrabold text-cyan-300">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Buy
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
