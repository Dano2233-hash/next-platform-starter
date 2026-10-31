import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, Layers, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  // Best price to display (lowest price if packages exist)
  const displayPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const displayOldPrice = product.oldPrice;
  const discountPercent = displayOldPrice && displayOldPrice > displayPrice
    ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#090e1c] hover:bg-[#0c1428] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-3.5 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/40 hover:shadow-cyan-950/30">
      <div>
        {/* Image Container with Badges */}
        <div className="relative mb-3.5">
          <Link to={`/product/${product.slug || product.id}`}>
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              height="h-44"
            />
          </Link>

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            {product.platform && (
              <span className="bg-slate-900/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="bg-slate-900/90 backdrop-blur-md text-slate-300 border border-slate-700/60 text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md shadow-md">
                {product.type}
              </span>
            )}
          </div>

          {/* Right badge: Discount or Out of Stock */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10 pointer-events-none">
            {isOutOfStock ? (
              <span className="bg-red-600/90 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow">
                Out of Stock
              </span>
            ) : discountPercent ? (
              <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 fill-current" /> -{discountPercent}%
              </span>
            ) : null}

            {product.tag && (
              <span className="bg-blue-600/80 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Product Meta: Rating, Sold, Packages */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-0.5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating ? Number(product.rating).toFixed(1) : '4.9'}</span>
            <span className="text-slate-400 font-normal">({product.soldCount || 120}+ sold)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{packageCount} {packageCount === 1 ? 'Package' : 'Packages'}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-base line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Product Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed min-h-[32px]">
          {product.description}
        </p>
      </div>

      {/* Pricing & Call to Actions */}
      <div className="pt-3 border-t border-slate-800/70">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {packageCount > 1 ? 'From' : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-cyan-400">
                {formatPrice(displayPrice)}
              </span>
              {displayOldPrice && displayOldPrice > displayPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(displayOldPrice)}
                </span>
              )}
            </div>
          </div>

          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isOutOfStock ? 'text-red-400 bg-red-950/40' : 'text-emerald-400 bg-emerald-950/40'
          }`}>
            {isOutOfStock ? 'Sold Out' : 'Instant Key'}
          </span>
        </div>

        {/* Buttons: Buy Now & Add to Cart */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Add to shopping cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-950/40"
          >
            <span>Buy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
