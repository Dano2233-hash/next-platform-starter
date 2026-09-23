import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Zap, CheckCircle2, ShoppingCart } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="group bg-[#090d1a] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {product.platform && (
            <span className="bg-slate-900/90 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md">
              {product.platform}
            </span>
          )}
          {product.type && (
            <span className="bg-slate-900/90 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[10px] font-semibold uppercase px-2 py-1 rounded-md shadow-md">
              {product.type}
            </span>
          )}
        </div>

        {product.oldPrice && product.oldPrice > product.price && (
          <span className="bg-red-500/90 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-md tracking-wider">
            SALE
          </span>
        )}
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          name={product.name}
          category={product.category}
          platform={product.platform}
          className="h-44"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Sold Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              <span>{product.soldCount ? `${product.soldCount}+ sold` : 'Available'}</span>
              <span className="mx-1">•</span>
              <span className="text-cyan-400">{packageCount} {packageCount === 1 ? 'pack' : 'packs'}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-800/60 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Price</span>
            <div className="text-right">
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-slate-500 line-through mr-1.5 font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {packageCount > 1 ? `From ${formatPrice(product.price)}` : formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-90 text-white shadow-md shadow-cyan-500/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
