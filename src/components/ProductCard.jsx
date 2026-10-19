import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Layers, CheckCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const minPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
    navigate('/checkout');
  };

  const handleCardClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#090e1f] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container with Badges */}
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          product={product}
          aspectRatio="aspect-[16/10]"
        />

        {/* Platform & Type Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#050814]/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            {product.platform || 'PC'}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#050814]/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {product.type || 'Digital'}
          </span>
        </div>

        {/* Tag / Discount Badge */}
        {product.tag && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md">
              {product.tag}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Row: Rating & Sold Count */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              {packageCount > 1 && (
                <span className="flex items-center gap-1 text-slate-400">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  {packageCount} Packages
                </span>
              )}
              <span>{product.soldCount || 100}+ Sold</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-sm sm:text-base line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-extrabold text-cyan-400">
                  {packageCount > 1 ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: Buy Now & Add To Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black text-xs font-black transition-all flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
