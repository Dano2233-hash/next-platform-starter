import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product.packages && product.packages.length > 0 ? product.packages[0] : null;
  });

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage if old price exists
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  // Base price or package price
  const displayPrice = selectedPackage ? selectedPackage.price : product.price;
  const displayOldPrice =
    selectedPackage && selectedPackage.id !== 'standard'
      ? null
      : product.oldPrice;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, 1);
  };

  return (
    <div className="group relative bg-[#0b0b0e] border border-slate-900 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col h-full">
      {/* Badges / Top Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center pointer-events-none">
        <div className="flex flex-col gap-1.5">
          {/* Platform Badge */}
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-slate-800">
            {product.platform}
          </span>
          {/* Type Badge */}
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#0066ff]/20 text-[#00e5ff] border border-[#0066ff]/30">
            {product.type}
          </span>
        </div>
        {/* Sale / Tag badge */}
        <div className="flex flex-col items-end gap-1.5">
          {discountPercent && (
            <span className="text-xs font-black px-2 py-0.5 rounded bg-red-600 text-white shadow-md shadow-red-600/20">
              -{discountPercent}%
            </span>
          )}
          {product.tag && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#7000ff] text-white">
              {product.tag}
            </span>
          )}
        </div>
      </div>

      {/* Out of stock overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/85 z-20 flex items-center justify-center p-4">
          <span className="text-red-500 font-extrabold text-sm uppercase tracking-widest border-2 border-red-500/30 bg-red-500/10 px-4 py-2 rounded-lg shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      {/* Product Image Clickable to details */}
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden aspect-[16/10]">
        <ProductImage product={product} className="transition-transform duration-500 group-hover:scale-105" />
        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-[#0066ff] text-white p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-bold">★</span>
            <span className="font-semibold text-slate-200">{product.rating}</span>
          </div>
          <div>
            <span className="text-slate-500">Sold:</span> <span className="font-semibold text-slate-300">{product.soldCount}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base text-slate-100 group-hover:text-[#00e5ff] transition-colors line-clamp-1">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 h-8 leading-relaxed">
          {product.description}
        </p>

        {/* Package selector if more than 1 package */}
        {product.packages && product.packages.length > 1 ? (
          <div className="mt-4 mb-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
              Select Package ({product.packages.length} Options)
            </label>
            <select
              value={selectedPackage ? selectedPackage.id : ''}
              onChange={(e) => {
                const pkg = product.packages.find((p) => p.id === e.target.value);
                setSelectedPackage(pkg);
              }}
              className="w-full bg-[#111116] border border-slate-800 rounded-lg text-xs py-2 px-3 text-slate-300 focus:outline-none focus:border-[#00e5ff] cursor-pointer"
            >
              {product.packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - {formatPrice(pkg.price)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="h-[46px] flex items-center text-xs text-slate-500 mt-4 pl-1 italic">
            Single Package Available
          </div>
        )}

        {/* Pricing & CTA Buttons */}
        <div className="mt-auto pt-4 border-t border-slate-900/60">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-black text-white">
              {formatPrice(displayPrice)}
            </span>
            {displayOldPrice && displayOldPrice > displayPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(displayOldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 rounded-xl py-2.5 px-3 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="bg-[#0066ff] hover:bg-[#0055dd] text-white rounded-xl py-2.5 px-3 text-xs font-bold transition-all shadow-md shadow-[#0066ff]/10 hover:shadow-[#0066ff]/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
