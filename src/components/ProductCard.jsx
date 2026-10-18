import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ShoppingCart, Zap } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const isSale = product.oldPrice && product.oldPrice > product.price;

  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    const defaultPackage = product.packages ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    const defaultPackage = product.packages ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="group relative bg-[#0b0f1d] border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between">
      {/* Product Image Section */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-48 rounded-t-xl"
        />

        {/* Platform & Type Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-md">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Discount Badge */}
        {isSale && !isOutOfStock && (
          <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow-lg backdrop-blur-md flex items-center gap-1 z-10">
            <Zap className="w-3 h-3 fill-white" />
            <span>-{discountPercent}%</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Tag & Stats Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            {product.tag ? (
              <span className="text-cyan-400 font-medium text-[11px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {product.tag}
              </span>
            ) : (
              <span className="text-slate-500 text-[11px]">{packageCount} {packageCount > 1 ? 'Packages' : 'Package'}</span>
            )}

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">{product.soldCount || 0} sold</span>
              <div className="flex items-center gap-0.5 text-amber-400 font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-3">
          {/* Pricing */}
          <div>
            <div className="text-[11px] text-slate-400 font-medium">
              {packageCount > 1 ? 'From' : 'Price'}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-cyan-400 font-extrabold text-lg tracking-tight">
                {formatPrice(product.price)}
              </span>
              {isSale && (
                <span className="text-slate-500 line-through text-xs font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-lg font-semibold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg text-xs shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
