import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Package, Check, AlertCircle } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packagesCount = product.packages ? product.packages.length : 0;

  // Calculate lowest price if packages exist
  let minPrice = product.price;
  let hasSale = !!product.oldPrice && product.oldPrice > minPrice;

  if (product.packages && product.packages.length > 0) {
    const prices = product.packages.map((p) => p.price);
    minPrice = Math.min(...prices);
    const selectedPkg = product.packages.find((p) => p.price === minPrice);
    if (selectedPkg && selectedPkg.oldPrice && selectedPkg.oldPrice > minPrice) {
      hasSale = true;
    }
  }

  const discountPercent = hasSale && product.oldPrice
    ? Math.round(((product.oldPrice - minPrice) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    openCart();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative flex flex-col bg-[#0b101c] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 overflow-hidden">
      {/* Top badges floating overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-slate-700/60 backdrop-blur-md">
            {product.platform || 'Digital'}
          </span>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-700/50 backdrop-blur-md">
            {product.type || 'Item'}
          </span>
        </div>

        {discountPercent ? (
          <span className="text-[11px] font-black tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
            -{discountPercent}%
          </span>
        ) : product.tag ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Out of stock overlay banner */}
      {isOutOfStock && (
        <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 z-20 bg-red-900/90 border-y border-red-500/50 text-white text-xs font-bold uppercase py-1.5 text-center tracking-widest backdrop-blur-md shadow-lg">
          Out of Stock
        </div>
      )}

      {/* Image container clickable */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        <ProductImage product={product} className="h-44 sm:h-48" />
      </Link>

      {/* Content body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating || '5.0'}</span>
          </div>
          {product.soldCount !== undefined && (
            <span className="text-[11px] text-slate-400">
              {product.soldCount.toLocaleString()} sold
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
          {product.description || 'Instant digital delivery with full warranty.'}
        </p>

        {/* Package info badge if multiple */}
        {packagesCount > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 self-start">
            <Package className="w-3 h-3 text-cyan-400" />
            <span>{packagesCount} Package Option{packagesCount > 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Footer section with price & buttons */}
        <div className="mt-auto pt-3 border-t border-slate-800/80 flex flex-col gap-3">
          {/* Price area */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-medium">
                {packagesCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-cyan-400">
                  {formatPrice(minPrice)}
                </span>
                {product.oldPrice && product.oldPrice > minPrice && (
                  <span className="text-xs text-slate-500 line-through font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800/90 text-cyan-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 active:scale-95'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-900/30 active:scale-95'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
