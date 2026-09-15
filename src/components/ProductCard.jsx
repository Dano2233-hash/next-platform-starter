import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Calculate discount percentage if old price exists
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const defaultPackage =
    product.packages && product.packages.length > 0 ? product.packages[0] : null;

  const displayPrice = defaultPackage ? defaultPackage.price : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, defaultPackage, 1);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, defaultPackage, 1);
      navigate('/checkout');
    }
  };

  return (
    <div className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 flex flex-col justify-between">
      {/* Top Image & Badges Container */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          title={product.name}
          category={product.category}
          platform={product.platform}
          className="h-44 w-full"
        />

        {/* Badges Top Left & Right */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md animate-pulse">
            -{discountPercent}%
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-red-950 border border-red-500/50 text-red-400 font-bold text-xs rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Main Content Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title & Category tag */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="text-base font-bold text-slate-100 line-clamp-1 tracking-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px]">
            {product.description}
          </p>

          {/* Social Proof / Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>

            <div className="text-[11px] text-slate-400">
              {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'In Stock'}
            </div>

            {product.packages && product.packages.length > 0 && (
              <span className="text-[11px] font-medium text-slate-400">
                {product.packages.length} {product.packages.length === 1 ? 'Pkg' : 'Pkgs'}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400">From</span>
            <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
              {formatPrice(displayPrice)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              Add
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
