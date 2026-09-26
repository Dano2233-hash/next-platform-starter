import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle, Package } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  // Determine pricing
  let minPrice = product.price;
  let minOldPrice = product.oldPrice;

  if (product.packages && product.packages.length > 0) {
    const prices = product.packages.map((p) => p.price);
    minPrice = Math.min(...prices);
    const selectedPkg = product.packages.find((p) => p.price === minPrice);
    if (selectedPkg && selectedPkg.oldPrice) {
      minOldPrice = selectedPkg.oldPrice;
    }
  }

  const discountPercent =
    minOldPrice && minOldPrice > minPrice
      ? Math.round(((minOldPrice - minPrice) / minOldPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const pkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, pkg, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const pkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, pkg, 1);
    navigate('/checkout');
  };

  return (
    <div className="group bg-[#0a0f1d] border border-slate-800 hover:border-cyan-500/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 relative">
      <div>
        {/* Image & Badges Overlay */}
        <Link to={`/product/${product.id}`} className="block relative">
          <ProductImage product={product} className="h-44" />

          {/* Discount Badge */}
          {discountPercent && !isOutOfStock && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow-md z-10">
              -{discountPercent}% OFF
            </div>
          )}

          {/* Tag Badge */}
          {product.tag && (
            <div className="absolute top-2 right-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded z-10">
              {product.tag}
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="bg-red-500/20 border border-red-500 text-red-400 font-bold text-xs uppercase px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-2.5">
          {/* Badges Row: Platform & Type */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
            <span className="bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-semibold">
              {product.platform || 'Multi-Platform'}
            </span>
            <span className="bg-cyan-950/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-semibold">
              {product.type || 'Digital'}
            </span>
            {packageCount > 1 && (
              <span className="ml-auto flex items-center gap-1 text-slate-400 font-medium text-[10px]">
                <Package className="w-3 h-3 text-purple-400" />
                {packageCount} Packages
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
            {product.description}
          </p>

          {/* Rating & Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{product.soldCount || 100}+ sold</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xs text-slate-400">From</span>
            <span className="text-base font-extrabold text-cyan-400">
              {formatPrice(minPrice)}
            </span>
            {minOldPrice && minOldPrice > minPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(minOldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
