import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock === 0;
  const hasPackages = Array.isArray(product.packages) && product.packages.length > 0;
  const displayPrice = hasPackages
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const displayOldPrice = hasPackages
    ? product.packages[0]?.oldPrice || product.oldPrice
    : product.oldPrice;

  const hasDiscount = displayOldPrice && displayOldPrice > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (hasPackages) {
      // Direct user to details page to choose package
      navigate(`/product/${product.slug || product.id}`);
    } else {
      addToCart(product);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (hasPackages) {
      navigate(`/product/${product.slug || product.id}`);
    } else {
      addToCart(product);
      navigate('/cart');
    }
  };

  return (
    <div className="group relative bg-[#0a0f1d] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between">
      <div>
        {/* Top badges over image */}
        <div className="relative">
          <ProductImage product={product} className="h-44 w-full" />

          {/* Badges container */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
            <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
              {product.platform || 'Global'}
            </span>
            <span className="bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md shadow">
              {product.type || 'Digital'}
            </span>
          </div>

          {/* Sale discount badge */}
          {hasDiscount && (
            <div className="absolute bottom-2 left-2 z-10 bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              -{discountPercent}%
            </div>
          )}

          {/* Out of stock badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col gap-2">
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span>{product.soldCount || 0} sold</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 text-sm hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 min-h-[2.25rem]">
            {product.description}
          </p>

          {/* Package count indicator if any */}
          {hasPackages && (
            <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span>{product.packages.length} Options Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom price and actions */}
      <div className="p-4 pt-0 mt-2 border-t border-slate-800/60 flex flex-col gap-3">
        <div className="flex items-baseline justify-between pt-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              {hasPackages ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-cyan-400">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(displayOldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 transition duration-200 shadow-md shadow-cyan-900/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
