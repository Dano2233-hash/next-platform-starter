import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ShoppingCart, Check, Flame } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  if (!product) return null;

  const {
    slug,
    name,
    category,
    platform,
    type,
    price,
    oldPrice,
    description,
    packages = [],
    stock = 100,
    rating = 5.0,
    soldCount = 0,
    tag,
    isComingSoon = false
  } = product;

  const isOutOfStock = stock <= 0;
  const packageCount = packages.length;
  const minPrice = packageCount > 0 ? Math.min(...packages.map((p) => p.price)) : price;
  const hasMultiplePackages = packageCount > 1;

  // Calculate discount percentage if old price exists
  const discountPercent =
    oldPrice && oldPrice > minPrice
      ? Math.round(((oldPrice - minPrice) / oldPrice) * 100)
      : 0;

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;
    const defaultPackage = packages[0] || { id: `${product.id}-default`, name: 'Standard', price: minPrice };
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;
    const defaultPackage = packages[0] || { id: `${product.id}-default`, name: 'Standard', price: minPrice };
    buyNow(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer overflow-hidden"
    >
      {/* Top Banner / Badges */}
      <div className="relative mb-3">
        <ProductImage product={product} className="h-44 w-full" />

        {/* Tag or Discount Badge */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {tag && (
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
              {tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-red-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Out of Stock / Coming Soon Badge */}
        {(isOutOfStock || isComingSoon) && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-xl flex items-center justify-center p-2 text-center z-20">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
              {isComingSoon ? 'Coming Soon' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Meta Bar: Platform, Type, Rating */}
      <div className="flex items-center justify-between text-xs mb-2 text-slate-400">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md font-medium text-[11px]">
            {platform}
          </span>
          <span className="px-2 py-0.5 bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 rounded-md font-medium text-[11px]">
            {type}
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold">
          <Star size={12} className="fill-amber-400 stroke-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-3">
        <h3 className="font-heading font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Stats row: Packages & Sold Count */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 pt-2 border-t border-slate-800/80">
        <span>
          {packageCount > 0 ? `${packageCount} Package${packageCount > 1 ? 's' : ''}` : 'Instant Delivery'}
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <Flame size={12} className="text-orange-400" />
          {soldCount} Sold
        </span>
      </div>

      {/* Price section */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-xs font-medium text-slate-400">Price</div>
          <div className="text-base font-extrabold text-cyan-400 font-heading">
            {formatPrice(minPrice, hasMultiplePackages)}
          </div>
        </div>
        {oldPrice && oldPrice > minPrice && (
          <div className="text-xs text-slate-500 line-through">
            {formatPrice(oldPrice)}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isComingSoon}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Add to Cart"
        >
          <ShoppingCart size={14} />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock || isComingSoon}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-heading shadow-md shadow-cyan-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={14} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
