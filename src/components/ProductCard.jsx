import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCart } from '../hooks/useCart.jsx';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;
  const isComingSoon = product.isComingSoon;

  // Calculate starting price
  const packages = product.packages || [];
  const minPackagePrice =
    packages.length > 0
      ? Math.min(...packages.map((pkg) => pkg.price))
      : product.price;

  const displayPrice = minPackagePrice || product.price || 0;

  // Calculate discount percentage if old price exists
  const oldPrice = product.oldPrice || (packages.length > 0 ? packages[0]?.oldPrice : null);
  const discountPercent =
    oldPrice && oldPrice > displayPrice
      ? Math.round(((oldPrice - displayPrice) / oldPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;

    const defaultPackage = packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
    toggleCart();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;

    const defaultPackage = packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#080d1e] border border-gray-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 relative">
      {/* Top Badges overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.platform && (
            <span className="px-2 py-0.5 rounded bg-[#050814]/85 backdrop-blur-md border border-gray-700/60 text-[10px] font-bold text-gray-200 uppercase">
              {product.platform}
            </span>
          )}
          {product.type && (
            <span className="px-2 py-0.5 rounded bg-blue-950/85 backdrop-blur-md border border-blue-800/50 text-[10px] font-bold text-blue-300 uppercase">
              {product.type}
            </span>
          )}
        </div>

        {/* Discount or Tag Badge */}
        {discountPercent ? (
          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[11px] shadow-md animate-pulse">
            -{discountPercent}%
          </span>
        ) : product.tag ? (
          <span className="px-2 py-0.5 rounded bg-cyan-500 text-gray-950 font-black text-[10px] uppercase shadow-md">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        <ProductImage product={product} className="h-44 md:h-48" />

        {/* Out of Stock or Coming Soon Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1.5 bg-red-950 border border-red-600 text-red-400 font-extrabold text-xs rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
        {isComingSoon && (
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1.5 bg-purple-950 border border-purple-500 text-purple-300 font-extrabold text-xs rounded-lg uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              {packages.length > 0 && (
                <span className="text-gray-400 font-semibold">{packages.length} Packages</span>
              )}
              {product.soldCount > 0 && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {product.soldCount}+ Sold
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug || product.id}`}
            className="block font-extrabold text-white text-base hover:text-cyan-400 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Row */}
        <div className="pt-2 border-t border-gray-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-cyan-300">
                  {packages.length > 1 ? `From ${formatPrice(displayPrice)}` : formatPrice(displayPrice)}
                </span>
                {oldPrice && oldPrice > displayPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isComingSoon}
              className="w-full py-2 px-2 bg-[#0d162a] hover:bg-[#132242] border border-gray-700 hover:border-cyan-500/60 text-cyan-300 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || isComingSoon}
              className="w-full py-2 px-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-gray-950 font-black text-xs rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-gray-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
