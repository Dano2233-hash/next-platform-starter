import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check, PackageCheck } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const minPrice = product.price;
  const hasOldPrice = product.oldPrice && product.oldPrice > minPrice;
  const discountPercent = hasOldPrice
    ? Math.round(((product.oldPrice - minPrice) / product.oldPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages?.[0] || { id: 'std', name: 'Standard', price: product.price };
    onAddToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages?.[0] || { id: 'std', name: 'Standard', price: product.price };
    onAddToCart(product, defaultPackage, 1);
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 overflow-hidden">
      {/* Image Container with Badges */}
      <Link to={`/products/${product.slug || product.id}`} className="block relative">
        <ProductImage
          image={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          className="h-44 sm:h-48"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md rounded border border-white/10">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 backdrop-blur-md rounded border border-cyan-500/30">
              {product.type}
            </span>
          </div>

          {hasOldPrice && (
            <span className="px-2 py-0.5 text-[11px] font-black text-black bg-cyan-400 rounded-md shadow-md animate-pulse">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Out of stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-red-600/90 text-white font-black text-xs uppercase tracking-widest rounded border border-red-400">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{product.soldCount || 0}+ sold</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
            {product.description}
          </p>
        </div>

        <div>
          {/* Packages Info */}
          {product.packages && product.packages.length > 1 && (
            <div className="text-[11px] text-slate-400 mb-2 font-medium">
              Available in <span className="text-cyan-400 font-bold">{product.packages.length} packages</span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline justify-between mb-3 border-t border-slate-800/80 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {product.packages && product.packages.length > 1 ? 'From ' : ''}
                  {formatPrice(minPrice)}
                </span>
                {hasOldPrice && (
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold text-xs transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold text-xs transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-900/30'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
