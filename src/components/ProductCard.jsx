import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  // Calculate lowest price if packages exist
  const displayPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  const hasMultiplePackages = product.packages && product.packages.length > 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 overflow-hidden">

      {/* Top Image & Badges Container */}
      <Link to={`/products/${product.id}`} className="block relative">
        <ProductImage
          src={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          alt={product.name}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          {product.platform && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-950/80 text-cyan-400 border border-cyan-800/40 backdrop-blur-md">
              {product.platform}
            </span>
          )}
          {product.type && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-950/80 text-purple-400 border border-purple-800/40 backdrop-blur-md">
              {product.type}
            </span>
          )}
        </div>

        {/* Tag / Sale Badge */}
        {product.oldPrice && product.oldPrice > displayPrice && (
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-extrabold rounded bg-rose-600 text-white shadow">
            SAVE {Math.round(((product.oldPrice - displayPrice) / product.oldPrice) * 100)}%
          </div>
        )}

        {/* Out of stock badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-600 text-rose-300 font-bold text-xs uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Subheader Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            {product.soldCount > 0 && (
              <span className="text-[11px] text-slate-400">{product.soldCount}+ Sold</span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-cyan-300 transition-colors">
            <h3 className="font-bold text-slate-100 text-base line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Package Info Badge */}
          {hasMultiplePackages && (
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>{product.packages.length} Package Options</span>
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400 font-medium">
              {hasMultiplePackages ? 'From ' : ''}
            </span>
            <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
              {formatPrice(displayPrice)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-extrabold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-900/30'
              }`}
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
