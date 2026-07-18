import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Flame, Star, ShoppingBag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0;

  // Find lowest price from packages if packages exist
  let displayPrice = product.price;
  let oldPrice = product.oldPrice;
  if (product.packages && product.packages.length > 0) {
    const sortedPkgs = [...product.packages].sort((a, b) => a.price - b.price);
    displayPrice = sortedPkgs[0].price;
    // Calculate a proportional old price or use the product level oldPrice if it makes sense
    if (product.oldPrice) {
      oldPrice = product.oldPrice;
    } else {
      oldPrice = Math.round(displayPrice * 1.25);
    }
  }

  const hasDiscount = oldPrice && oldPrice > displayPrice;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - displayPrice) / oldPrice) * 100) : 0;

  const packageCount = product.packages ? product.packages.length : 0;

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-500/10 bg-[#0a0f1d]/50 hover:bg-[#0a0f1d]/80 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/5">

      {/* Top badges over image */}
      <div className="relative p-2.5 pb-0 cursor-pointer" onClick={handleCardClick}>
        <ProductImage product={product} className="h-44" />

        {/* Absolute floating platform and discount badges */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/75 backdrop-blur-sm text-cyan-400 border border-cyan-400/20 shadow">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/75 backdrop-blur-sm text-purple-400 border border-purple-400/20 shadow">
              {product.type}
            </span>
          </div>

          {hasDiscount && !isOutOfStock && (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-black bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow">
              <Flame className="h-3.5 w-3.5 animate-bounce" />
              -{discountPercent}%
            </span>
          )}

          {isOutOfStock && (
            <span className="px-2 py-1 rounded-md text-xs font-black bg-rose-950 text-rose-400 border border-rose-800 shadow">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Body contents */}
      <div className="flex-1 flex flex-col p-4 cursor-pointer" onClick={handleCardClick}>
        {/* Rating and Sold row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-gray-200">{product.rating}</span>
          </div>
          <div>
            <span className="text-gray-500">Sold:</span> <span className="font-bold text-gray-300">{product.soldCount}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-base tracking-tight line-clamp-1 group-hover:text-cyan-400 transition">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Package count indicator */}
        {packageCount > 0 && (
          <div className="mt-2.5">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/5 text-gray-400">
              {packageCount} Option{packageCount > 1 ? 's' : ''} Available
            </span>
          </div>
        )}
      </div>

      {/* Footer Pricing & Actions row */}
      <div className="p-4 pt-0 border-t border-white/[0.03]">
        {/* Price display */}
        <div className="flex items-baseline justify-between mt-3 mb-4">
          <div>
            <span className="text-xs text-gray-500 block font-semibold">Starting From</span>
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              {formatPrice(displayPrice)}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-bold border transition-all duration-300 ${
              isOutOfStock
                ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-gray-400'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add Cart</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product);
            }}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-black uppercase transition-all duration-300 ${
              isOutOfStock
                ? 'bg-gray-950 text-gray-600 cursor-not-allowed border-none'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-950/40 hover:shadow-cyan-400/20 hover:scale-[1.02]'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
