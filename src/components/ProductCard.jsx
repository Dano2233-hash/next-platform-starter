import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, ShieldCheck, Layers } from 'lucide-react';
import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCart } from '../hooks/useCart.jsx';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const lowestPrice = product.price;
  const discountPercent = product.oldPrice && product.oldPrice > lowestPrice
    ? Math.round(((product.oldPrice - lowestPrice) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0], 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0], 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
      {/* Top Image Section with Badges */}
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <Link to={`/products/${product.slug || product.id}`}>
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            aspectRatio="aspect-[16/10]"
          />
        </Link>

        {/* Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-slate-700/80 rounded-md shadow-sm">
            {product.platform}
          </span>
          {/* Type Badge */}
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-950/80 backdrop-blur-md text-blue-300 border border-blue-800/80 rounded-md shadow-sm">
            {product.type}
          </span>
        </div>

        {/* Top Right Sale / Stock Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-950/90 text-red-300 border border-red-800/80 rounded-md shadow-sm">
              Out of Stock
            </span>
          ) : discountPercent ? (
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-md shadow-md shadow-red-600/30">
              -{discountPercent}% OFF
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md backdrop-blur-md">
              {product.tag}
            </span>
          ) : null}
        </div>
      </div>

      {/* Main Info Body */}
      <div className="flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Rating, Sold & Package Counts */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || 5.0}</span>
              <span className="text-slate-500">({product.soldCount || 100}+ sold)</span>
            </div>
            {product.packages?.length > 1 && (
              <div className="flex items-center gap-1 text-slate-400 text-[10px] bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/50">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>{product.packages.length} Packages</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] font-medium text-slate-400">
              {product.packages?.length > 1 ? 'From' : 'Price'}
            </span>
            <div className="text-right">
              {product.oldPrice && (
                <span className="text-xs text-slate-500 line-through mr-1.5">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-sm font-extrabold text-cyan-400 font-heading tracking-wide">
                {formatPrice(lowestPrice)}
              </span>
            </div>
          </div>

          {/* Buttons: Buy Now & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 border ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-cyan-500/50'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all duration-200 shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
