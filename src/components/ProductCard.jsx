import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Zap, CheckCircle2, PackageCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    id,
    name,
    slug,
    category,
    platform,
    type,
    price,
    oldPrice,
    description,
    packages,
    stock = 100,
    rating = 4.9,
    soldCount = 100,
    tag,
    isFlashDeal,
  } = product;

  const isOutOfStock = stock <= 0;
  const hasSale = oldPrice && oldPrice > price;
  const discountPercent = hasSale ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const packageCount = packages && packages.length > 0 ? packages.length : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packages && packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = packages && packages.length > 0 ? packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#0b0f19] border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">

      {/* Top Media Section */}
      <div>
        <Link to={`/product/${id}`} className="block relative mb-3">
          <ProductImage product={product} className="h-44" />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {/* Platform Badge */}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-950/85 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {platform}
            </span>
            {/* Type Badge */}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-950/85 text-purple-300 border border-purple-500/30 backdrop-blur-md">
              {type}
            </span>
          </div>

          {/* Tag & Discount Badges */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
            {hasSale && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-rose-500/30">
                -{discountPercent}%
              </span>
            )}
            {tag && !hasSale && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                {tag}
              </span>
            )}
            {isOutOfStock && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-950/90 text-red-400 border border-red-500/40 backdrop-blur-md">
                Out of Stock
              </span>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {soldCount}+ sold
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${id}`}>
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-400 transition-colors">
              {name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed min-h-[36px]">
            {description}
          </p>

          {/* Package count badge if packages exist */}
          {packageCount > 0 && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
              <PackageCheck className="w-3 h-3 text-cyan-400" />
              <span>{packageCount} Packages Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Price</span>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-base text-cyan-400">
                {packageCount > 1 ? `From ${formatPrice(price)}` : formatPrice(price)}
              </span>
              {hasSale && (
                <span className="text-xs font-semibold text-slate-500 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              isOutOfStock
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
              isOutOfStock
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
