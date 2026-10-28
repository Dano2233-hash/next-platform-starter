import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Zap, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const packageCount = product.packages ? product.packages.length : 1;
  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
  };

  return (
    <div className="group relative bg-[#0a0f1d] border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {discount && !isOutOfStock && (
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md">
            -{discount}%
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800/80 uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-slate-500 font-normal">({product.soldCount || 100}+ sold)</span>
            </div>
            <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[10px] border border-slate-800">
              {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
            </span>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed h-8">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-cyan-400">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
              <Zap className="w-3 h-3" /> Auto Instant
            </span>
          </div>

          <div className="grid grid-[#12182b] grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 font-semibold text-xs border border-slate-700/60 hover:border-cyan-500/50 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
