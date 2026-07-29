import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, ShoppingBag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const { id, name, category, platform, type, packages, stock, rating, soldCount, oldPrice, tag } = product;

  // Determine pricing
  const minPrice = packages && packages.length > 0
    ? Math.min(...packages.map(p => p.price))
    : product.price;

  const hasMultiplePackages = packages && packages.length > 1;
  const isOutOfStock = stock <= 0;

  // Handle Quick Buy: add first package to cart and navigate straight to checkout
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packages && packages.length > 0 ? packages[0] : { name: 'Standard', price: product.price };
    onAddToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packages && packages.length > 0 ? packages[0] : { name: 'Standard', price: product.price };
    onAddToCart(product, defaultPackage, 1);
  };

  return (
    <div className="group bg-[#0d0d11] border border-white/5 hover:border-cyan-500/30 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,102,255,0.15)] relative">

      {/* Top Badges / Tag */}
      {tag && (
        <span className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase tracking-wider bg-purple-600/90 text-white px-2 py-0.5 rounded-full border border-purple-500/20">
          {tag}
        </span>
      )}

      {/* Product Image Link */}
      <Link to={`/products/${id}`} className="block relative">
        <ProductImage src={product.image} name={name} category={category} platform={platform} className="h-44 sm:h-48" />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-xs">
            <span className="bg-red-500/90 text-white font-black uppercase text-xs px-3 py-1.5 rounded tracking-widest border border-red-400">
              OUT OF STOCK
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Platform & Type Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
            {platform}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded">
            {type}
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${id}`} className="block group-hover:text-cyan-400 transition-colors mb-1.5">
          <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-[11px] text-white/50 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Info row: Rating, Sold Count, Packages Count */}
        <div className="flex items-center justify-between text-[11px] text-white/40 border-t border-white/5 pt-2.5 mt-auto">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white/80">{rating.toFixed(1)}</span>
          </div>
          <div>
            <span>{soldCount}+ Sold</span>
          </div>
          {packages && packages.length > 0 && (
            <div>
              <span className="bg-white/5 px-1.5 py-0.5 rounded text-white/70 font-semibold">{packages.length} options</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline justify-between">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-[10px] text-white/40 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
            <span className="text-sm font-black text-cyan-400">
              {hasMultiplePackages ? 'From ' : ''}
              {formatPrice(minPrice)}
            </span>
          </div>
          {oldPrice && (
            <span className="text-[9px] font-bold bg-green-500/10 border border-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
              -{Math.round(((oldPrice - minPrice) / oldPrice) * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Buy / Action buttons */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-wider py-2 px-1 rounded transition-all duration-200 cursor-pointer ${
            isOutOfStock
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-cyan-500 text-black hover:bg-cyan-400 font-bold active:scale-95'
          }`}
        >
          <Zap className="h-3.5 w-3.5 fill-black" />
          Buy
        </button>

        <button
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          className={`flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-wider py-2 px-1 rounded border transition-all duration-200 cursor-pointer ${
            isOutOfStock
              ? 'border-white/5 bg-transparent text-white/30 cursor-not-allowed'
              : 'border-[#0066ff]/30 hover:border-cyan-500/40 bg-[#0066ff]/10 hover:bg-[#0066ff]/20 text-cyan-300 font-bold active:scale-95'
          }`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          + Cart
        </button>
      </div>

    </div>
  );
}
