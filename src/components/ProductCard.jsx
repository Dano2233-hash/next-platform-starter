import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, CheckCircle, Tag, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  // Compute lowest price and sale status
  let lowestPrice = product.price;
  let oldPrice = product.oldPrice;

  if (product.packages && product.packages.length > 0) {
    const prices = product.packages.map((p) => p.price);
    lowestPrice = Math.min(...prices);
    const selectedPkg = product.packages.find((p) => p.price === lowestPrice);
    if (selectedPkg && selectedPkg.oldPrice) {
      oldPrice = selectedPkg.oldPrice;
    }
  }

  const hasDiscount = oldPrice && oldPrice > lowestPrice;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - lowestPrice) / oldPrice) * 100) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPkg, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#0d1322] border border-slate-800/80 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-950/30 flex flex-col justify-between">
      {/* Product Image Component */}
      <div className="relative">
        <Link to={`/product/${product.slug || product.id}`}>
          <ProductImage product={product} alt={product.name} />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-sm">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-md shadow-sm">
            {product.type}
          </span>
        </div>

        {/* Tag / Discount Badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="px-2 py-0.5 text-[11px] font-extrabold rounded bg-red-600/90 text-white shadow-md backdrop-blur-sm animate-pulse">
              -{discountPercent}%
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/90 text-slate-950 shadow-md backdrop-blur-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-red-950/80 border border-red-500/40 text-red-400 font-bold text-xs rounded uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating || '4.9'}
            </span>
            <span>{product.soldCount ? `${product.soldCount}+ Sold` : 'Instant Delivery'}</span>
          </div>

          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Package info badge if present */}
        {product.packages && product.packages.length > 1 && (
          <div className="text-[11px] text-cyan-300/80 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800 flex items-center justify-between">
            <span>Packages Available:</span>
            <span className="font-bold text-cyan-400">{product.packages.length} Options</span>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 mt-1">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-base font-black text-cyan-400">
              {formatPrice(lowestPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-cyan-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
