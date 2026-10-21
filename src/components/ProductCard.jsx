import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const packageCount = product.packages ? product.packages.length : 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <div className="group relative bg-[#0a0f24]/90 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between">
      <Link to={`/product/${product.slug || product.id}`} className="block relative">
        {/* Image Container with Consistent Height */}
        <div className="w-full h-48 relative overflow-hidden bg-slate-900">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-bold text-cyan-400 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-900/80 border border-blue-700/80 text-[10px] font-bold text-blue-200 backdrop-blur-md">
              {product.type}
            </span>
          </div>

          {/* Tag & Discount Overlay */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md">
                -{discountPercent}%
              </span>
            )}
            {product.tag && (
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[10px] shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="px-3 py-1.5 rounded-lg bg-red-950/90 border border-red-600/80 text-red-400 text-xs font-black uppercase tracking-wider shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating || '5.0'}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {product.soldCount ? `${product.soldCount}+ Sold` : 'In Stock'}
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Info & Pricing */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-400">
                <Tag className="w-3 h-3 text-cyan-400" />
                {packageCount} Option{packageCount > 1 ? 's' : ''}
              </span>
              <span className="text-slate-500 font-medium">Instant Code</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">From</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-cyan-400 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {isSale && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:text-cyan-300"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md shadow-cyan-950/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Buy Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
