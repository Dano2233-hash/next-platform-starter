import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Package, Tag } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const lowestPrice = product.price || (product.packages && product.packages[0] ? product.packages[0].price : 0);
  const oldPrice = product.oldPrice || (product.packages && product.packages[0] ? product.packages[0].oldPrice : null);

  const discountPercent = oldPrice && oldPrice > lowestPrice
    ? Math.round(((oldPrice - lowestPrice) / oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages[0] ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages[0] ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const getPlatformBadgeColor = (plat) => {
    switch (plat) {
      case 'PlayStation':
        return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'Xbox':
        return 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30';
      case 'PC':
        return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'Mobile':
        return 'bg-amber-600/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
      <Link to={`/product/${product.slug || product.id}`} className="block flex-1">
        {/* Top Image Section */}
        <div className="relative">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            className="h-44 sm:h-48"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border backdrop-blur-md ${getPlatformBadgeColor(product.platform)}`}>
              {product.platform || 'Digital'}
            </span>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border bg-slate-950/80 border-slate-700/80 text-slate-300 backdrop-blur-md">
              {product.type || 'Product'}
            </span>
          </div>

          {/* Sale Discount Badge or Tag */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-rose-600 text-white shadow-md animate-pulse">
                -{discountPercent}% OFF
              </span>
            )}
            {product.tag && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Out of Stock Overlay Badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="px-3 py-1 rounded.lg bg-rose-950/90 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-widest shadow-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {product.rating ? product.rating.toFixed(1) : '5.0'}
              </span>
              <span className="text-slate-400 font-medium">
                {product.soldCount || 0} Sold
              </span>
            </div>

            <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-sm sm:text-base line-clamp-1">
              {product.name}
            </h3>

            <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Info & Price Section */}
          <div className="border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3 text-cyan-400" />
                {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
              </span>
              {discountPercent > 0 && oldPrice && (
                <span className="line-through text-slate-500 font-medium">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block -mb-1">From</span>
                <span className="text-base sm:text-lg font-black text-cyan-400">
                  {formatPrice(lowestPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden xs:inline">Add</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold transition-all shadow-md shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
