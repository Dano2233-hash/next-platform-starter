import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const primaryPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
  const displayPrice = primaryPackage ? primaryPackage.price : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, primaryPackage, 1);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, primaryPackage, 1);
      navigate('/checkout');
    }
  };

  return (
    <div className="group relative bg-[#090e1a] border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">

      {/* Product Image Section */}
      <Link to={`/products/${product.slug || product.id}`} className="relative block overflow-hidden aspect-[16/10]">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-bold text-cyan-300 backdrop-blur-md uppercase">
            {product.platform || 'PC'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-700/80 text-[10px] font-bold text-indigo-300 backdrop-blur-md uppercase">
            {product.type || 'Game'}
          </span>
        </div>

        {/* Sale / Tag Badge */}
        {product.oldPrice && product.oldPrice > displayPrice && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-[10px] font-extrabold text-white shadow-md uppercase">
              Sale
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-lg bg-red-950 border border-red-700 text-red-400 text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount || 100}+ sold
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={`/products/${product.slug || product.id}`}
            className="block text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1 mb-1"
          >
            {product.name}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
            {product.description}
          </p>
        </div>

        {/* Packages indicator */}
        {product.packages && product.packages.length > 1 && (
          <div className="text-[11px] text-cyan-400/90 font-semibold bg-cyan-950/30 border border-cyan-800/30 rounded-lg px-2.5 py-1 w-max">
            {product.packages.length} Packages Available
          </div>
        )}

        {/* Price & Buy Actions */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              {product.packages && product.packages.length > 1 ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-cyan-400">
                {formatPrice(displayPrice)}
              </span>
              {product.oldPrice && product.oldPrice > displayPrice && (
                <span className="text-[11px] text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500 disabled:opacity-40 disabled:pointer-events-none transition-all"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap"
            >
              Buy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
