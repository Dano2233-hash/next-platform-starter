import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // Find minimum price among packages or use product.price
  const getMinPrice = () => {
    if (product.packages && product.packages.length > 0) {
      return Math.min(...product.packages.map((pkg) => pkg.price));
    }
    return product.price;
  };

  const getMinPackage = () => {
    if (product.packages && product.packages.length > 0) {
      return product.packages.reduce((min, pkg) => (pkg.price < min.price ? pkg : min), product.packages[0]);
    }
    return null;
  };

  const minPrice = getMinPrice();
  const minPackage = getMinPackage();
  const isSale = product.oldPrice && product.oldPrice > minPrice;
  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - minPrice) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product, minPackage, 1);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product, minPackage, 1);
    }
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#0a0a14] border border-slate-900 rounded-lg overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 flex flex-col h-full relative">

      {/* Discount Badge */}
      {isSale && !isOutOfStock && (
        <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-md">
          -{discountPercent}% OFF
        </span>
      )}

      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <span className="absolute inset-0 z-20 bg-black/75 flex items-center justify-center text-red-500 font-extrabold uppercase text-xs tracking-widest rounded-lg">
          OUT OF STOCK
        </span>
      )}

      {/* Product Image Fallback Frame */}
      <Link to={`/product/${product.slug}`} className="block relative">
        <ProductImage product={product} />
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Badges: Platform and Type */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">
            {product.platform}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/10">
            {product.type}
          </span>
          {product.packages && product.packages.length > 0 && (
            <span className="text-[9px] font-medium tracking-wider text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              {product.packages.length} Packages
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Sold Count & Rating */}
        <div className="flex items-center justify-between mt-3 mb-4 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-slate-300 font-bold">{product.rating.toFixed(1)}</span>
          </div>
          <div>
            <span>Sold: </span>
            <span className="text-slate-300 font-bold">{product.soldCount}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-slate-900/80 pt-3 mt-auto">
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Price</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-200">
                  {product.packages && product.packages.length > 1 ? 'From ' : ''}
                  <span className="text-cyan-400 font-black">{formatPrice(minPrice)}</span>
                </span>
              </div>
            </div>
            {isSale && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center space-x-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-2 px-1.5 rounded text-[11px] font-bold transition-all duration-200 border border-slate-800 hover:border-slate-700 disabled:opacity-50 disabled:pointer-events-none"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center space-x-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 hover:text-black font-black py-2 px-1.5 rounded text-[11px] uppercase tracking-wider transition-all duration-200 shadow-md shadow-cyan-500/5 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
