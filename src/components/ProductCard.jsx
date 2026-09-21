import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const defaultPackage = product.packages && product.packages.length > 0
    ? product.packages[0]
    : { name: 'Standard', price: product.price };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#090f1e] hover:bg-[#0d162d] border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden">
      <div>
        {/* Top Image Container */}
        <div className="relative mb-3 rounded-xl overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="h-44 w-full"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
            {/* Platform Badge */}
            <span className="bg-[#050811]/90 backdrop-blur-md text-cyan-400 font-bold text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-wider">
              {product.platform || 'Digital'}
            </span>

            {/* Sale / Tag Badge */}
            {hasSale ? (
              <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-sm">
                -{discountPercent}% OFF
              </span>
            ) : product.tag ? (
              <span className="bg-purple-900/90 text-purple-300 font-bold text-[10px] px-2 py-0.5 rounded border border-purple-500/30">
                {product.tag}
              </span>
            ) : null}
          </div>

          {/* Type Badge Bottom Left */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="bg-slate-900/90 text-slate-300 font-semibold text-[10px] px-2 py-0.5 rounded border border-slate-700">
              {product.type || 'Digital Service'}
            </span>
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="bg-red-950 border border-red-500 text-red-400 font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 px-1">
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span className="text-slate-500 font-medium">
              {product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Instant'}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
            {product.description}
          </p>

          {/* Package info */}
          {product.packages && product.packages.length > 0 && (
            <div className="text-[11px] text-slate-500 font-medium pt-1">
              {product.packages.length} package options available
            </div>
          )}
        </div>
      </div>

      {/* Pricing & CTA Buttons */}
      <div className="pt-3 mt-2 border-t border-slate-800/80 space-y-2.5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block -mb-0.5">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-cyan-400 font-extrabold text-base">
                {formatPrice(product.price)}
              </span>
              {hasSale && (
                <span className="text-slate-500 line-through text-xs font-medium">
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
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
              isOutOfStock
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cart</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              isOutOfStock
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-md shadow-cyan-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
