import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, ShieldCheck, Layers } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

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
    setIsCartOpen(true);
  };

  return (
    <div className="group relative bg-[#090d1a] hover:bg-[#0d1428] border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/5">
      {/* Top Badges */}
      <div className="relative mb-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-44 object-cover"
        />

        {/* Platform Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-cyan-300 rounded-md border border-cyan-500/30 backdrop-blur-md">
            {product.platform || 'Digital'}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-slate-300 rounded-md border border-slate-700/50 backdrop-blur-md">
            {product.type || 'Game'}
          </span>
        </div>

        {/* Discount Tag */}
        {discount && !isOutOfStock && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-md">
            -{discount}%
          </div>
        )}

        {/* Out of stock overlay badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-10">
            <span className="px-3 py-1 bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-red-500/50">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Short Description */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Metrics Row: Rating, Sold Count, Packages */}
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating || '4.9'}</span>
          </div>
          {product.soldCount && (
            <span className="text-slate-400">{product.soldCount}+ sold</span>
          )}
          {packageCount > 1 && (
            <span className="flex items-center gap-1 text-cyan-400 font-medium">
              <Layers className="w-3 h-3" /> {packageCount} options
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xs text-slate-400 font-medium">From</span>
          <span className="text-base font-extrabold text-cyan-400 tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-xs text-slate-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 active:scale-[0.98]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 active:scale-[0.98]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
