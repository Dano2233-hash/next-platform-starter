import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Flame, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packages = product.packages || [];
  const packageCount = packages.length;

  // Determine displayed price & sale status
  let displayPrice = product.price;
  let displayOldPrice = product.oldPrice;

  if (packageCount > 0) {
    displayPrice = packages[0].price;
    displayOldPrice = packages[0].oldPrice || null;
  }

  const isSale = displayOldPrice && displayOldPrice > displayPrice;
  const discountPercent = isSale
    ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const selectedPkg = packageCount > 0 ? packages[0] : null;
    addToCart(product, selectedPkg, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const selectedPkg = packageCount > 0 ? packages[0] : null;
    addToCart(product, selectedPkg, 1);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#0a0e1a] rounded-xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top Image Section */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block">
        <ProductImage
          src={product.image}
          alt={product.name}
          title={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-44 object-cover"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.platform && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                {product.type}
              </span>
            )}
          </div>

          {isOutOfStock ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950/90 text-red-400 border border-red-500/40">
              Out of Stock
            </span>
          ) : isSale ? (
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          ) : null}
        </div>

        {product.tag && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 fill-slate-950" />
              {product.tag}
            </span>
          </div>
        )}
      </Link>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            {product.soldCount > 0 && (
              <span className="text-slate-500 font-medium">{product.soldCount}+ sold</span>
            )}
          </div>

          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[2.25rem]">
            {product.description}
          </p>

          {packageCount > 0 && (
            <div className="mt-2 text-[10px] text-cyan-400/90 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>{packageCount} packages available</span>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <span className="text-sm font-extrabold text-cyan-400">
                {formatPrice(displayPrice)}
              </span>
            </div>
            {isSale && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(displayOldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
