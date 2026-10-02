import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const startingPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const isSale = product.oldPrice && product.oldPrice > startingPrice;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - startingPrice) / product.oldPrice) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, product.packages ? product.packages[0] : null, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, product.packages ? product.packages[0] : null, 1);
    navigate('/checkout');
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer group relative overflow-hidden"
    >
      {/* Top Section */}
      <div>
        {/* Product Image */}
        <div className="relative mb-3.5">
          <ProductImage
            src={product.image}
            alt={product.name}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="h-44"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
              {product.platform}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-purple-300 border border-purple-500/30">
              {product.type}
            </span>
          </div>

          {/* Sale or Tag Badge */}
          {isSale ? (
            <span className="absolute top-2.5 right-2.5 text-[11px] font-black tracking-wide px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-lg shadow-rose-900/50 z-10">
              -{discountPercent}% OFF
            </span>
          ) : product.tag ? (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/40 z-10">
              {product.tag}
            </span>
          ) : null}

          {/* Out of stock badge */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center rounded-xl z-20">
              <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs border border-rose-500/30">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Title & Stats */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              {product.soldCount || 100}+ sold
            </span>
          </div>

          <h3 className="font-bold text-slate-100 text-base leading-snug group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Package Count & Price */}
      <div className="pt-3 border-t border-slate-800/80 mt-auto">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              {product.packages && product.packages.length > 1
                ? `${product.packages.length} Options From`
                : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-cyan-400 tracking-tight">
                {formatPrice(startingPrice)}
              </span>
              {isSale && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            Add
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
