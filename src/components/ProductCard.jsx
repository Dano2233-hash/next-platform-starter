import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages?.length || 0;

  // Determine lowest price among main price or packages
  let displayPrice = product.price;
  let oldPrice = product.oldPrice;

  if (packageCount > 0) {
    const minPkgPrice = Math.min(...product.packages.map((p) => p.price));
    if (minPkgPrice < displayPrice) {
      displayPrice = minPkgPrice;
    }
  }

  // Calculate discount percentage if oldPrice exists
  let discountPercent = 0;
  if (oldPrice && oldPrice > displayPrice) {
    discountPercent = Math.round(((oldPrice - displayPrice) / oldPrice) * 100);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Add first package or product itself
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Product Image & Badges Container */}
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden">
        <ProductImage product={product} />

        {/* Platform Badge */}
        <span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
          {product.platform || 'Digital'}
        </span>

        {/* Type Badge */}
        <span className="absolute top-2 right-2 z-10 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
          {product.type || 'Digital'}
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && !isOutOfStock && (
          <span className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded text-[11px] font-extrabold bg-red-600 text-white shadow">
            -{discountPercent}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
            <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating & Sold Count Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount || 0} sold
            </span>
          </div>

          {/* Title */}
          <Link to={`/products/${product.id}`}>
            <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 text-base mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Package Count Badge if available */}
          {packageCount > 0 && (
            <div className="mb-2 text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>{packageCount} Option{packageCount > 1 ? 's' : ''} Available</span>
            </div>
          )}

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-slate-400 font-medium">From</span>
            <span className="text-lg font-extrabold text-cyan-400">
              {formatPrice(displayPrice)}
            </span>
            {oldPrice && oldPrice > displayPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
              }`}
              title="Add to Cart"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" /> Cart
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-bold transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
