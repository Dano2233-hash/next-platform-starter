import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Flame, Star, Tag } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const showDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = showDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Find the starting price from either packages or the basic price property
  const startingPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((pkg) => pkg.price))
    : product.price;

  const defaultPackage = product.packages && product.packages.length > 0
    ? product.packages[0]
    : { name: 'Standard Edition', price: product.price };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      onAddToCart(product, defaultPackage, 1);
      navigate('/checkout');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      onAddToCart(product, defaultPackage, 1);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#12121e] bg-[#0c0c14] transition-all hover:border-[#0066ff]/50 hover:bg-[#0e0e18] hover:shadow-[0_4px_20px_rgba(0,102,255,0.15)]">

      {/* Top Media Anchor */}
      <Link to={`/products/${product.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <ProductImage
          image={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          type={product.type}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="rounded bg-[#050505]/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#00e5ff] backdrop-blur-sm border border-[#1e1e2d]">
            {product.platform}
          </span>
          <span className="rounded bg-[#0066ff]/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {product.type}
          </span>
        </div>

        {/* Sale Discount Badge */}
        {showDiscount && (
          <div className="absolute top-2 right-2 rounded bg-red-600 px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-white flex items-center gap-0.5">
            <Flame size={10} className="fill-white" />
            <span>-{discountPercent}% OFF</span>
          </div>
        )}

        {/* Out Of Stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#050505]/80 flex items-center justify-center backdrop-blur-[2px]">
            <span className="rounded-md border border-red-500/50 bg-red-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-red-500">
              Out Of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content info */}
      <div className="flex flex-col flex-1 p-4">

        {/* Rating and Tag details */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-300">{product.rating}</span>
            <span>({product.soldCount} sold)</span>
          </div>
          {product.tag && (
            <span className="text-[10px] font-medium text-[#7000ff] bg-[#7000ff]/10 px-1.5 py-0.5 rounded">
              {product.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="text-sm font-extrabold text-white group-hover:text-[#00e5ff] transition line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Packages Count info */}
        {product.packages && product.packages.length > 0 && (
          <div className="mt-2 text-[10px] text-[#00e5ff] font-medium">
            ⚡ {product.packages.length} Package Option{product.packages.length > 1 ? 's' : ''} available
          </div>
        )}

        {/* Spacer */}
        <div className="mt-auto pt-4">

          {/* Prices Layout */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-500">Starting From</span>
              <span className="text-sm font-black text-[#00e5ff]">{formatPrice(startingPrice)}</span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-gray-500 line-through font-medium">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* User Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#1e1e2d] bg-transparent py-2 text-xs font-bold text-gray-300 hover:bg-[#12121e] hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <ShoppingCart size={13} />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="rounded-lg bg-gradient-to-r from-[#0066ff] to-[#7000ff] py-2 text-xs font-black text-white hover:from-[#0055dd] hover:to-[#5e00dd] transition shadow-md hover:shadow-[#0066ff]/20 disabled:opacity-30 disabled:pointer-events-none"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
