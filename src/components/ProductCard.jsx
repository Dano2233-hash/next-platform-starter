import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const isOutOfStock = Number(product.stock) <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  // Platform tag styles
  const getPlatformBadge = (platform) => {
    switch (platform) {
      case 'Xbox':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40';
      case 'PlayStation':
        return 'bg-blue-950/80 text-blue-400 border-blue-800/40';
      case 'PC':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-800/40';
      case 'Mobile':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/40';
      case 'Gift Card':
        return 'bg-purple-950/80 text-purple-400 border-purple-800/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Type badge styles
  const getTypeBadge = (type) => {
    switch (type) {
      case 'Top-Up':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/40';
      case 'Subscription':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40';
      case 'Gift Card':
        return 'bg-violet-950/80 text-violet-300 border-violet-800/40';
      case 'Game':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, product.packages?.[0] || null, 1, true);
    }
  };

  const handleDirectBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, product.packages?.[0] || null, 1, false);
      navigate('/checkout');
    }
  };

  // Discount calculation
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-[#090d1a] border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 hover:-translate-y-1">
      <div>
        {/* Visual / Image Container */}
        <div className="relative">
          <Link to={`/products/${product.slug || product.id}`}>
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              heightClass="h-44 sm:h-48"
            />
          </Link>

          {/* Badges on Top */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs ${getPlatformBadge(product.platform)}`}>
              {product.platform}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs ${getTypeBadge(product.type)}`}>
              {product.type}
            </span>
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[11px] font-extrabold shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 inline fill-current" />
              <span>-{discountPercent}%</span>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs rounded-xl flex items-center justify-center z-20">
              <span className="px-3 py-1 bg-red-600/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-md border border-red-500/50 shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Meta: Title & Description */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating?.toFixed(1) || '4.9'}</span>
            </div>
            <span>{product.soldCount || 100}+ Sold</span>
            <span className="text-cyan-400 font-medium">
              {packageCount} {packageCount === 1 ? 'tier' : 'packages'}
            </span>
          </div>

          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[11px] text-slate-400 font-medium">From</span>
          <span className="text-base sm:text-lg font-extrabold text-cyan-400">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-slate-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="w-full py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">Add to Cart</span>
          </button>

          <button
            onClick={handleDirectBuy}
            disabled={isOutOfStock}
            className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-black font-extrabold text-xs transition-all shadow-md shadow-cyan-950/40 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
