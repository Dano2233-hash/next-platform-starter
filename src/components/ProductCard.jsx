import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, Flame, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packagesCount = product.packages ? product.packages.length : 1;
  const lowestPrice = product.price;

  const discountPercent = product.oldPrice && product.oldPrice > lowestPrice
    ? Math.round(((product.oldPrice - lowestPrice) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div className="group bg-[#090e1f] border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col h-full relative">

      {/* Top Media Section */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
        <ProductImage
          image={product.image}
          name={product.name}
          platform={product.platform}
          category={product.category}
          alt={product.name}
          className="h-44 w-full"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
            {product.platform || 'Digital'}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
            {product.type || 'Product'}
          </span>
        </div>

        {/* Discount / Tag Badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-sm flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded bg-red-600/90 text-white font-orbitron font-bold text-xs uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{product.soldCount || '100+'} sold</span>
            </div>
            <div className="text-purple-300 font-mono text-[10px] bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-500/20">
              {packagesCount} {packagesCount === 1 ? 'Pkg' : 'Pkgs'}
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">From</span>
              <span className="font-orbitron font-extrabold text-base text-cyan-400">
                {formatPrice(lowestPrice)}
              </span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
