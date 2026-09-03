import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, XCircle } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const hasPackages = product.packages && product.packages.length > 0;
  const lowestPrice = hasPackages
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const highestOldPrice = hasPackages
    ? Math.max(...product.packages.map((p) => p.oldPrice || p.price))
    : product.oldPrice;

  const discountPercent =
    highestOldPrice && highestOldPrice > lowestPrice
      ? Math.round(((highestOldPrice - lowestPrice) / highestOldPrice) * 100)
      : null;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.stock) return;
    const selectedPkg = hasPackages ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.stock) return;
    const selectedPkg = hasPackages ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
  };

  return (
    <div className="bg-[#0b1021] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-950/40 flex flex-col justify-between group">
      <div>
        {/* Image & Badges Container */}
        <div className="relative">
          <Link to={`/product/${product.slug}`}>
            <ProductImage product={product} className="h-48" />
          </Link>

          {/* Platform & Type Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-slate-700/60 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-800/50 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Discount Tag */}
          {discountPercent && discountPercent > 0 && (
            <div className="absolute top-2.5 right-2.5 z-10 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-md animate-pulse">
              -{discountPercent}% OFF
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.stock && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <XCircle className="w-10 h-10 text-rose-500 mb-1" />
              <span className="text-rose-400 font-bold text-sm tracking-wide">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-bold text-slate-100 text-base leading-snug group-hover:text-cyan-400 transition-colors duration-200 line-clamp-1 mb-1">
                {product.name}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-slate-400 text-xs line-clamp-2 min-h-[32px] mb-3 leading-relaxed">
              {product.description}
            </p>

            {/* Stats row: Rating, Sold Count, Package count */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200">{product.rating || 5.0}</span>
                <span className="text-[11px] text-slate-500">({product.soldCount || 100}+ sold)</span>
              </div>
              {hasPackages && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {product.packages.length} Options
                </span>
              )}
            </div>
          </div>

          {/* Price display */}
          <div className="mb-4">
            <div className="text-[11px] font-medium text-slate-400">
              {hasPackages ? 'Starting from' : 'Price'}
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-lg font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {formatPrice(lowestPrice)}
              </span>
              {highestOldPrice && highestOldPrice > lowestPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(highestOldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleBuyNow}
          disabled={!product.stock}
          className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md shadow-cyan-950/50"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!product.stock}
          className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 disabled:opacity-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  );
};
