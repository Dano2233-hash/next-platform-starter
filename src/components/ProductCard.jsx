import React from 'react';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';
import ProductImage from './ProductImage';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage if old price exists
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Render platform badges with custom coloring
  const getPlatformBadge = (plat) => {
    let base = "text-[10px] px-2 py-0.5 rounded font-black tracking-wider uppercase border ";
    switch (plat) {
      case 'PC':
        return <span className={base + "bg-blue-950/80 text-blue-400 border-blue-800/40"}>PC</span>;
      case 'Xbox':
        return <span className={base + "bg-green-950/80 text-green-400 border-green-800/40"}>Xbox</span>;
      case 'PlayStation':
        return <span className={base + "bg-indigo-950/80 text-indigo-400 border-indigo-800/40"}>PS</span>;
      case 'Mobile':
        return <span className={base + "bg-cyan-950/80 text-cyan-400 border-cyan-800/40"}>Mobile</span>;
      default:
        return <span className={base + "bg-purple-950/80 text-purple-400 border-purple-800/40"}>Gift Card</span>;
    }
  };

  const getTypeBadge = (type) => {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#1b1b2f] text-gray-300 border border-white/5">
        {type}
      </span>
    );
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Default package is the first listed, or the base price
    const defaultPackageName = product.packages && product.packages.length > 0
      ? product.packages[0].name
      : 'Standard';
    const defaultPrice = product.packages && product.packages.length > 0
      ? product.packages[0].price
      : product.price;

    addToCart(product, defaultPackageName, defaultPrice, 1);
  };

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const defaultPackageName = product.packages && product.packages.length > 0
      ? product.packages[0].name
      : 'Standard';
    const defaultPrice = product.packages && product.packages.length > 0
      ? product.packages[0].price
      : product.price;

    addToCart(product, defaultPackageName, defaultPrice, 1);
    window.location.href = '/checkout';
  };

  return (
    <div className="group relative bg-[#090911] hover:bg-[#0d0d1a] border border-white/5 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-full shadow-lg hover:shadow-cyan-500/10">

      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {getPlatformBadge(product.platform)}
          {getTypeBadge(product.type)}
        </div>

        {hasDiscount && (
          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Main Link Wrapper */}
      <a href={`/product/${product.slug}`} className="block overflow-hidden flex-1">
        {/* Aspect Ratio Image Wrapper */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-950">
          <ProductImage product={product} className="h-full" />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-red-950/80 text-red-400 text-xs font-black tracking-widest uppercase border border-red-800/60 px-4 py-2 rounded-lg">
                Out Of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-2.5">
          {/* Rating and Sold count */}
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-gray-200 font-bold">{product.rating}</span>
            </div>
            {product.soldCount > 0 && (
              <span>Sold: {product.soldCount}</span>
            )}
            {product.packages && product.packages.length > 1 && (
              <span className="text-cyan-400 font-bold">
                {product.packages.length} Packages
              </span>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-1">
            <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors text-base line-clamp-1">
              {product.name}
            </h4>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed h-8">
              {product.description}
            </p>
          </div>

          {/* Tag marker */}
          {product.tag && (
            <div className="inline-block text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded">
              {product.tag}
            </div>
          )}
        </div>
      </a>

      {/* Pricing and Action Buttons */}
      <div className="p-4 pt-0 mt-auto border-t border-white/5 space-y-3 bg-gradient-to-b from-transparent to-[#0a0a14]">

        {/* Pricing area */}
        <div className="flex items-baseline justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">
              {product.packages && product.packages.length > 1 ? 'From' : 'Price'}
            </span>
            <span className="text-base font-black text-white">
              {formatPrice(product.price)}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className={`w-full py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-[#111122] border-white/10 hover:border-cyan-500/40 text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>+ Cart</span>
          </button>

          <button
            onClick={handleBuyNowClick}
            disabled={isOutOfStock}
            className={`w-full py-2 px-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
              isOutOfStock
                ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white shadow-lg shadow-blue-500/15'
            }`}
          >
            <span>Buy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
