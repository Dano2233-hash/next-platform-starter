import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';
import { Star, ShoppingCart, Zap, Layers, AlertCircle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock !== undefined && Number(product.stock) <= 0;
  const packageCount = product.packages ? product.packages.length : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
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
    <div className="group relative bg-[#090e1a] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Top Image & Overlay Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <Link to={`/product/${product.slug}`} className="block h-full">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-slate-900/90 text-slate-300 border border-slate-700/50 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {product.oldPrice && product.oldPrice > product.price && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-red-500/90 text-white shadow-md backdrop-blur-md">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Out of Stock Overlay Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
            </span>
          </div>
        )}

        {/* Tag Pill if exists */}
        {product.tag && !isOutOfStock && (
          <div className="absolute bottom-2 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-600 text-white shadow">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount ? `${product.soldCount} Sold` : 'Fast Delivery'}
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Package count indicator */}
        {packageCount > 1 && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{packageCount} Packages available</span>
          </div>
        )}

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-500 uppercase block font-medium">Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-cyan-400">
                  {packageCount > 1 ? `From ${formatPrice(product.price)}` : formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 active:scale-[0.98]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
              <span>Add Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-[0.98]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
