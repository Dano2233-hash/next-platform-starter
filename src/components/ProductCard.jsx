import React, { useState } from 'react';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

/**
 * Premium, clean gaming e-commerce Product Card component.
 */
export function ProductCard({ product }) {
  const { navigate } = useNavigation();
  const { addToCart } = useCart();
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage if applicable
  let discountPercentage = 0;
  if (product.oldPrice && product.oldPrice > product.price) {
    discountPercentage = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  // Find lowest price among packages if they exist
  const basePrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  // Formatting platform badges for premium gaming looks
  const getPlatformStyle = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30';
      case 'xbox':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'playstation':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'mobile':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'giftcard':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      case 'subscription':
        return 'bg-pink-500/10 text-pink-400 border border-pink-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/30';
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card navigation
    if (isOutOfStock) return;

    // Default to the first package
    const defaultPackage = product.packages && product.packages.length > 0
      ? product.packages[0]
      : { name: 'Standard Edition', price: product.price };

    addToCart(product, defaultPackage, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    // Default to the first package
    const defaultPackage = product.packages && product.packages.length > 0
      ? product.packages[0]
      : { name: 'Standard Edition', price: product.price };

    addToCart(product, defaultPackage, 1);
    navigate('#/checkout');
  };

  return (
    <div
      onClick={() => navigate(`#/product/${product.slug}`)}
      className="group relative flex flex-col justify-between bg-[#0d0d15] border border-brand-border/60 hover:border-brand-blue/60 rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 animate-fade-in"
    >

      {/* Top Badges overlay on Card */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
        {discountPercentage > 0 && (
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md">
            -{discountPercentage}% OFF
          </span>
        )}
        {product.tag && (
          <span className="bg-brand-blue text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md border border-brand-cyan/20">
            {product.tag}
          </span>
        )}
      </div>

      {/* Out of Stock overlay on Card image */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/75 z-20 flex items-center justify-center rounded-xl border border-red-500/20">
          <span className="bg-red-600/90 text-white text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-md border border-red-500">
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Product Image section */}
      <div className="mb-4">
        <ProductImage product={product} className="h-44 sm:h-48" />
      </div>

      {/* Product Badges (Platform & Type) */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getPlatformStyle(product.platform)}`}>
          {product.platform}
        </span>
        <span className="bg-white/5 text-gray-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-white/5">
          {product.type}
        </span>
      </div>

      {/* Product Title */}
      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-cyan transition-colors duration-200 line-clamp-1 mb-1">
        {product.name}
      </h3>

      {/* Product Description */}
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
        {product.description}
      </p>

      {/* Rating & Sold counts */}
      <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-gray-200">{Number(product.rating || 5.0).toFixed(1)}</span>
        </div>
        <div className="text-gray-500 text-[11px]">
          <span className="text-gray-300 font-semibold">{product.soldCount || 0}</span> sold
        </div>
      </div>

      {/* Packaging / Option Counts */}
      <div className="text-[11px] text-gray-500 mb-4 flex items-center justify-between">
        <span>Options:</span>
        <span className="text-brand-cyan font-bold bg-brand-blue/5 px-2 py-0.5 rounded border border-brand-cyan/10">
          {product.packages?.length || 1} {product.packages?.length === 1 ? 'Package' : 'Packages'}
        </span>
      </div>

      {/* Price Block & Action Buttons */}
      <div className="mt-auto space-y-3">
        {/* Prices */}
        <div className="flex items-baseline gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">From</span>
            <span className="text-base sm:text-lg font-black text-brand-cyan">
              {formatPrice(basePrice)}
            </span>
          </div>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1 px-2 py-2 text-xs font-bold rounded-lg border transition-all ${
              isAddedFeedback
                ? 'bg-green-600/20 text-green-400 border-green-500/50'
                : 'bg-transparent text-gray-300 border-brand-border/80 hover:text-white hover:border-brand-blue/50 hover:bg-brand-blue/5 disabled:opacity-50 disabled:pointer-events-none'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {isAddedFeedback ? 'Added!' : 'Add'}
          </button>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-bold rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all btn-glow"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
