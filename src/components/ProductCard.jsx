import React from 'react';
import { ShoppingCart, ArrowRight, Eye, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0;

  // Calculate percentage discount if oldPrice is present
  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleBuyNow = (e) => {
    e.preventDefault();
    onBuyNow(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <div className="group relative bg-[#090911] border border-[#121225] rounded-xl overflow-hidden flex flex-col justify-between h-full hover:border-[#0066ff]/40 transition-premium glow-blue/5">

      {/* Product Image section with badges */}
      <div className="relative aspect-video w-full bg-[#05050c] overflow-hidden">

        {/* Absolute badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="bg-[#00e5ff] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-md">
            {product.platform}
          </span>
          <span className="bg-[#7000ff] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-md">
            {product.type}
          </span>
        </div>

        {discountPercent && (
          <div className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md z-10 animate-pulse">
            -{discountPercent}% OFF
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-10 select-none">
            <span className="border-2 border-red-500 text-red-500 text-xs font-black tracking-widest px-3 py-1 rounded-md uppercase rotate-[-6deg]">
              Out Of Stock
            </span>
          </div>
        )}

        {/* Real image component (with Visual Fallback inside) */}
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <ProductImage product={product} className="w-full h-full object-cover group-hover:scale-105" />
        </Link>
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              <span>{product.rating}</span>
            </div>
            <div>
              <span>{product.soldCount}+ Sold</span>
            </div>
          </div>

          <Link to={`/products/${product.slug}`}>
            <h3 className="font-extrabold text-white text-sm line-clamp-1 group-hover:text-[#00e5ff] transition-premium leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-400 text-[11px] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-2.5 text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
            📁 {product.packages?.length || 1} Option{product.packages?.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* Footer actions and price tag */}
        <div className="mt-4 pt-3 border-t border-[#121225]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-gray-400 font-medium">From</span>
            <span className="text-sm font-black text-[#00e5ff] tracking-tight">
              {formatPrice(product.price)}
            </span>
            {hasSale && (
              <span className="text-[10px] text-gray-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/products/${product.slug}`}
              className="flex items-center justify-center gap-1.5 bg-[#0a0a16] hover:bg-[#12122a] text-[11px] font-bold text-white py-2 rounded-lg border border-[#1a1a2e] transition-premium"
            >
              <Eye className="w-3.5 h-3.5 text-[#00e5ff]" />
              Details
            </Link>

            {isOutOfStock ? (
              <button
                disabled
                className="bg-neutral-800 text-neutral-500 text-[11px] font-bold py-2 rounded-lg cursor-not-allowed uppercase"
              >
                No Stock
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1.5 bg-[#0066ff] hover:bg-[#0055dd] text-[11px] font-bold text-white py-2 rounded-lg shadow-md transition-premium"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add
              </button>
            )}
          </div>

          {!isOutOfStock && (
            <button
              onClick={handleBuyNow}
              className="w-full mt-2 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#00e5ff] to-[#7000ff] hover:from-[#00c5df] hover:to-[#6000ef] text-black text-[11px] font-black py-2 rounded-lg transition-premium uppercase tracking-widest"
            >
              Buy Now
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
