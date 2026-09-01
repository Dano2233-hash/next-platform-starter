import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Layers } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#080e29]/90 border border-cyan-900/30 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Badges container overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex flex-wrap justify-between items-center gap-1.5 pointer-events-none">
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#04091e]/80 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/30 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {isOutOfStock ? (
            <span className="text-[10px] font-bold uppercase bg-rose-950/90 text-rose-400 px-2 py-0.5 rounded-md border border-rose-500/40">
              Out of Stock
            </span>
          ) : isSale ? (
            <span className="text-[10px] font-extrabold uppercase bg-emerald-950/90 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/40 animate-pulse">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="text-[10px] font-extrabold uppercase bg-purple-950/90 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/40">
              {product.tag}
            </span>
          ) : null}
        </div>

        {/* Product Image Component */}
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-44 sm:h-48"
        />
      </Link>

      {/* Card Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Social Proof Stats */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || 5.0}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{product.soldCount || 100}+ sold</span>
          </div>
          {product.packages && product.packages.length > 1 && (
            <div className="flex items-center gap-1 text-cyan-400/90 font-medium">
              <Layers className="w-3 h-3" />
              <span>{product.packages.length} options</span>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium block">
                Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {isSale && (
                  <span className="text-xs line-through text-slate-500 font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
            {product.packages && product.packages.length > 1 && (
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded font-mono">
                From
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 border ${
                isOutOfStock
                  ? 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed'
                  : 'border-cyan-500/40 bg-[#061033] hover:bg-cyan-950/60 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
