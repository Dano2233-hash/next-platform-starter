import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, CheckCircle, Flame, Tag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  const isOut = product.stock === 'out_of_stock';
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group bg-[#0b1021] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/40 relative">
      <div>
        {/* Top Image Header */}
        <div className="relative">
          <Link to={`/product/${product.id}`}>
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-44 w-full"
            />
          </Link>

          {/* Badges Container */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-slate-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Tag / Discount Badge */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
            {hasDiscount && (
              <span className="px-2 py-0.5 text-[11px] font-black rounded bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
                -{discountPercent}%
              </span>
            )}
            {product.tag && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-500 text-black shadow-md flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-black" />
                {product.tag}
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {isOut && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-extrabold uppercase tracking-widest rounded-md border border-red-400/30">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-2">
          {/* Rating and Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || 5.0}</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'In demand'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Package count info */}
          {product.packages && product.packages.length > 0 && (
            <div className="text-[11px] text-cyan-400/90 flex items-center gap-1 mt-0.5">
              <Tag className="w-3 h-3" />
              <span>{product.packages.length} Packages Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price and Action Buttons */}
      <div className="p-4 pt-0 mt-2 border-t border-slate-800/60 flex flex-col gap-3">
        <div className="flex items-baseline justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Price
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-cyan-300">
                {product.packages && product.packages.length > 1 ? `From ` : ''}
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOut}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOut}
            className="py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 disabled:opacity-50 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-950"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
