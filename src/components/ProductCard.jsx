import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 0;

  // Calculate discount percentage if old price exists
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1, true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1, false);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#090e21] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between h-full">
      {/* Top Media / Thumbnail Section */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block overflow-hidden">
        <ProductImage
          image={product.image}
          title={product.name}
          category={product.category}
          platform={product.platform}
          className="h-48 w-full"
        />

        {/* Platform Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 border border-slate-700/80 text-cyan-300 backdrop-blur-md">
            {product.platform || 'Digital'}
          </span>
          <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 border border-slate-700/60 text-purple-300 backdrop-blur-md">
            {product.type || 'Service'}
          </span>
        </div>

        {/* Tag / Discount Badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-purple-950/80 border border-purple-500/30 text-purple-300">
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of stock overlay banner */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1.5 rounded-xl bg-red-950/90 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <ShieldAlert className="w-4 h-4" /> Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {product.soldCount ? `${product.soldCount}+ Sold` : 'In Stock'}
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug || product.id}`}
            className="block font-heading font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5"
          >
            {product.name}
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Package info & Pricing */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2 border-t border-slate-800/80 pt-2.5">
            <span className="text-[11px] text-slate-400">
              {packageCount > 1 ? `${packageCount} Packages Available` : 'Direct Top-Up'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Fast Delivery
            </span>
          </div>

          {/* Price Container */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-lg font-black text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 hover:text-white shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Buy Now"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
