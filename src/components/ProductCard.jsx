import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Layers } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock <= 0) return;
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock <= 0) return;
    addToCart(product);
  };

  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const packageCount = product.packages ? product.packages.length : 0;

  return (
    <Link
      to={`/products/${product.slug || product.id}`}
      className="group bg-[#0a0e1a] hover:bg-[#0d1326] border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-950/20 relative overflow-hidden"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative mb-3">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
          />

          {/* Top Floating Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
            <span className="bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded shadow">
              {product.platform || 'PC'}
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-purple-400 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded shadow">
              {product.type || 'Game'}
            </span>
          </div>

          {/* Discount / Tag Badge */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1 z-10">
            {isSale && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 fill-current" />
                -{discountPercent}%
              </span>
            )}
            {product.tag && !isSale && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                {product.tag}
              </span>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
              <span className="bg-red-500/20 border border-red-500/50 text-red-400 font-bold text-xs px-3 py-1 rounded">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-2">
              {packageCount > 0 && (
                <span className="flex items-center gap-0.5 text-slate-400">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  {packageCount} {packageCount === 1 ? 'Pack' : 'Packs'}
                </span>
              )}
              <span>{product.soldCount || 0} Sold</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-sm">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Starting From</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-cyan-400">
                {formatPrice(product.price)}
              </span>
              {isSale && (
                <span className="text-[10px] line-through text-slate-500">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
