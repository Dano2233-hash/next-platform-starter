import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#090d1a] border border-slate-800/80 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
        />

        {/* Platform & Type Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-slate-900/90 text-cyan-400 border border-cyan-500/30 rounded backdrop-blur-sm">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-slate-900/90 text-slate-300 border border-slate-700/80 rounded backdrop-blur-sm">
            {product.type}
          </span>
        </div>

        {/* Discount / Flash Deal Badge */}
        {hasDiscount && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white rounded shadow-md">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Out of Stock Overlay Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-red-900/90 text-red-200 border border-red-500/50 rounded-md font-bold text-xs uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Tag & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="text-cyan-400 font-medium flex items-center gap-1 text-[11px]">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
              {product.tag || 'Instant Key'}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-slate-300 font-medium text-[11px]">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {product.rating} ({product.soldCount || 100}+ sold)
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Packages Info */}
          {product.packages && product.packages.length > 0 && (
            <div className="text-[11px] text-slate-400 mb-2 font-medium">
              {product.packages.length} {product.packages.length === 1 ? 'Package Available' : 'Packages Available'}
            </div>
          )}

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400">From</span>
            <span className="text-base font-extrabold text-cyan-400">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-slate-700/80 transition-colors"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="px-2.5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-md shadow-blue-950/50 transition-all duration-200"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
