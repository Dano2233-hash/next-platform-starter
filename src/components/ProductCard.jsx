import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

/**
 * Product card must show:
 * - Product image (using ProductImage fallback)
 * - Platform badge: PC / Xbox / PlayStation / Mobile / Gift Card
 * - Type badge: Game / Top-Up / Gift Card / Subscription / Account
 * - Product title
 * - Short description
 * - Sold count
 * - Rating
 * - Package count
 * - Price: From X IQD
 * - Old price if sale
 * - Discount badge if sale
 * - Buy button
 * - Add to cart button
 * - Out of stock badge if unavailable
 */
export function ProductCard({ product }) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = Number(product.stock) <= 0;
  const packageCount = product.packages ? product.packages.length : 1;
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.packages?.[0] || null, 1);
    navigate('/checkout');
  };

  // Badges styling helpers
  const getPlatformBadgeColor = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      case 'xbox':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'playstation':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60';
      case 'mobile':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div className="group relative bg-[#090d1a] hover:bg-[#0d1326] border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg shadow-black/40 hover:shadow-cyan-950/30">
      {/* Top Badges & Image Container */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block">
        <ProductImage
          image={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          type={product.type}
          className="h-44 w-full"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getPlatformBadgeColor(product.platform)}`}>
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-purple-300 border border-purple-800/60 backdrop-blur-md">
            {product.type}
          </span>
        </div>

        {/* Discount or Out of Stock Badge */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800/80 shadow-md">
              Out of Stock
            </span>
          ) : discountPercent ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              {product.tag}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-200">{Number(product.rating || 4.9).toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>{product.soldCount || 0} sold</span>
              <span>•</span>
              <span className="text-cyan-400/90">{packageCount} {packageCount === 1 ? 'tier' : 'packages'}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug || product.id}`} className="block group-hover:text-cyan-300 transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-slate-100 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description || 'Fast digital delivery with full warranty.'}
          </p>
        </div>

        {/* Pricing & Buttons section */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          {/* Price display */}
          <div className="flex items-baseline justify-between gap-1 mb-3">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-cyan-300 font-mono">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Action buttons: Buy and Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                isOutOfStock
                  ? 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 active:scale-95 cursor-pointer'
              }`}
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-950 active:scale-95 cursor-pointer'
              }`}
            >
              <span>{isOutOfStock ? 'Sold Out' : 'Buy Now'}</span>
              {!isOutOfStock && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
