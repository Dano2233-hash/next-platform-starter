import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Layers } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

/**
 * Product Card Requirement:
 * - Product image
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
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages?.length || 1;
  const lowestPackagePrice = product.packages?.length
    ? Math.min(...product.packages.map((p) => p.price))
    : product.price;

  const hasDiscount = product.oldPrice && product.oldPrice > lowestPackagePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - lowestPackagePrice) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages?.[0] || null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages?.[0] || null;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative flex flex-col rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 overflow-hidden">

      {/* Clickable Image & Header Link */}
      <Link to={`/products/${product.slug || product.id}`} className="block relative">
        <ProductImage
          image={product.image}
          name={product.name}
          category={product.category}
          platform={product.platform}
          containerClassName="h-44 w-full"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
            {product.platform || 'Digital'}
          </span>
          {/* Type Badge */}
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
            {product.type || 'Game'}
          </span>
        </div>

        {/* Discount or Out of Stock Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 items-end">
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-rose-600/90 text-white border border-rose-400/40">
              Out of Stock
            </span>
          ) : hasDiscount ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide bg-emerald-500/90 text-slate-950 shadow-md">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-blue-600/80 text-white">
              {product.tag}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 justify-between gap-3">
        <div>
          {/* Meta line: Rating & Sold Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
            <div className="flex items-center gap-2">
              {packageCount > 1 && (
                <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300">
                  <Layers className="w-3 h-3" />
                  {packageCount} Packages
                </span>
              )}
              <span className="text-[11px] text-slate-400">
                {product.soldCount ? `${product.soldCount}+ sold` : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description || 'Instant digital delivery.'}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-white">
                  {formatPrice(lowestPackagePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">
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
              className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span>Buy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
