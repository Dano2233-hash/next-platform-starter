import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Layers } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 1;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const selectedPkg = product.packages?.[0] || null;
    addToCart(product, selectedPkg, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const selectedPkg = product.packages?.[0] || null;
    addToCart(product, selectedPkg, 1);
  };

  const getPlatformBadgeColor = () => {
    const p = (product.platform || '').toLowerCase();
    if (p.includes('xbox')) return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
    if (p.includes('playstation')) return 'bg-blue-950/80 text-blue-400 border-blue-500/30';
    if (p.includes('mobile')) return 'bg-amber-950/80 text-amber-400 border-amber-500/30';
    if (p.includes('pc')) return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30';
    return 'bg-purple-950/80 text-purple-400 border-purple-500/30';
  };

  const getTypeBadgeColor = () => {
    const t = (product.type || '').toLowerCase();
    if (t.includes('top-up')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    if (t.includes('gift')) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (t.includes('sub')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
  };

  return (
    <div className="group relative flex flex-col bg-[#0d1222] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Clickable Image Container */}
      <Link to={`/product/${product.slug}`} className="relative block">
        <ProductImage
          src={product.image}
          alt={product.name}
          name={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-44 sm:h-48"
        />

        {/* Badges on top of image */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-20">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getPlatformBadgeColor()}`}>
            {product.platform}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getTypeBadgeColor()}`}>
            {product.type}
          </span>
        </div>

        {/* Top Right Sale / Out of stock tag */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-20">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-red-600 text-white shadow-md shadow-red-900/50">
              Out of stock
            </span>
          ) : hasDiscount ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-600/80 text-white backdrop-blur-md border border-cyan-400/30">
              {product.tag}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating, Sold Count & Packages Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-200">{product.rating || '4.9'}</span>
              <span className="text-slate-500">({product.soldCount || 100}+ sold)</span>
            </div>
            {packageCount > 1 && (
              <span className="flex items-center gap-1 text-[11px] text-cyan-400/90 font-medium">
                <Layers className="w-3 h-3" /> {packageCount} packages
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-cyan-400">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-slate-800/40 text-slate-500 border-slate-700/40 cursor-not-allowed'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border-slate-700 hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/20'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
