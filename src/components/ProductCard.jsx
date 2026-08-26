import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : null;

  // Calculate price display
  const currentPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  const oldPrice = product.oldPrice || (product.packages && product.packages[0]?.oldPrice);
  const hasDiscount = oldPrice && oldPrice > currentPrice;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Default to first package if packages exist
    const defaultPackage = product.packages && product.packages.length > 0
      ? product.packages[0]
      : null;

    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const defaultPackage = product.packages && product.packages.length > 0
      ? product.packages[0]
      : null;

    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#0b101d] border border-gray-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top Badges */}
      <div className="relative">
        <Link to={`/products/${product.slug || product.id}`}>
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            heightClass="h-44"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/90 text-white backdrop-blur-md shadow-md">
              {product.platform}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600/90 text-white backdrop-blur-md shadow-md">
              {product.type}
            </span>
          </div>

          {hasDiscount && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Tag Overlay (Hot, Best Seller, etc) */}
        {product.tag && (
          <div className="absolute bottom-2 left-2 pointer-events-none">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/90 text-black backdrop-blur-md">
              {product.tag}
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center pointer-events-none">
            <span className="px-3 py-1 bg-red-600/90 text-white font-bold text-xs rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <div className="flex items-center space-x-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            {product.soldCount !== undefined && (
              <span className="text-[11px] text-gray-400 font-medium">
                {product.soldCount.toLocaleString()} Sold
              </span>
            )}
          </div>

          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-sm md:text-base">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 line-clamp-2 mt-1 min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Package count indicator */}
        {packageCount && (
          <div className="text-[11px] text-cyan-400/90 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            <span>{packageCount} Packages Available</span>
          </div>
        )}

        {/* Price Section */}
        <div className="pt-2 border-t border-gray-800/80">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-gray-400">
              {packageCount ? 'From' : ''}
            </span>
            <span className="text-base md:text-lg font-extrabold text-white">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 bg-gray-800/80 hover:bg-cyan-950/80 hover:border-cyan-500/50 border border-gray-700/60 text-cyan-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
