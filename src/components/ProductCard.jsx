import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShoppingCart, ArrowRight, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    navigate('/cart');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const calculateDiscountPercent = () => {
    if (product.oldPrice && product.oldPrice > product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return null;
  };

  const discount = calculateDiscountPercent();
  const packageCount = product.packages ? product.packages.length : 1;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-[#090d18] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between">
      <Link to={`/product/${product.slug}`} className="block relative">
        {/* Product Image Component */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="w-full h-full"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
              {product.platform}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-950/90 text-blue-300 border border-blue-500/30 backdrop-blur-xs">
              {product.type}
            </span>
          </div>

          {/* Discount / Tag Badge */}
          {discount ? (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
                -{discount}% OFF
              </span>
            </div>
          ) : product.tag ? (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-900/90 text-purple-200 border border-purple-500/40">
                {product.tag}
              </span>
            </div>
          ) : null}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-20 flex items-center justify-center">
              <span className="text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-lg border border-red-800/80 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Rating & Sold count */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating || 5.0}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {product.soldCount ? `${product.soldCount}+ sold` : 'In Stock'}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-300 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>

            {/* Package count indicator */}
            {packageCount > 1 && (
              <div className="mt-2 text-[11px] text-cyan-400/90 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>{packageCount} packages available</span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <span className="font-extrabold text-cyan-300 text-base">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 hover:text-black transition-all shadow-md shadow-cyan-950/50 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Buy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
