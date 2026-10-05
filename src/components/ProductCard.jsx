import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check, Package } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    const selectedPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOutOfStock) return;
    const selectedPkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, selectedPkg, 1);
  };

  return (
    <div className="group glass-card rounded-xl overflow-hidden flex flex-col justify-between h-full border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 relative shadow-lg hover:shadow-cyan-950/30">
      {/* Top Badges overlay */}
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          platform={product.platform}
          type={product.type}
          className="h-44"
        />

        {/* Platform & Type Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-500/30 tracking-wide uppercase">
            {product.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-md text-[10px] font-medium text-slate-300 border border-slate-700/50">
            {product.type}
          </span>
        </div>

        {/* Discount Badge */}
        {isSale && !isOutOfStock && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[11px] shadow-md tracking-wider">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Out of Stock Overlay Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-lg bg-red-950/90 border border-red-500/50 text-red-400 font-bold text-xs uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Tag */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link to={`/products/${product.slug || product.id}`} className="hover:text-cyan-400 transition-colors">
              <h3 className="font-bold text-slate-100 text-sm line-clamp-1 leading-snug group-hover:text-cyan-300">
                {product.name}
              </h3>
            </Link>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mb-3 h-8 leading-relaxed">
            {product.description}
          </p>

          {/* Sold Count, Package Count & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3.5 pb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-slate-500 font-normal">({product.soldCount || 100}+ sold)</span>
            </div>

            <div className="flex items-center gap-1 text-cyan-400/90 font-medium bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              <Package className="w-3 h-3" />
              <span>{packageCount} {packageCount === 1 ? 'Pkg' : 'Pkgs'}</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                {packageCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-extrabold text-cyan-400 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {isSale && (
                  <span className="text-xs text-slate-500 line-through font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-2 px-3 rounded-lg font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1 shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 hover:shadow-cyan-500/25'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-2 px-2 rounded-lg font-semibold text-xs border transition-all duration-200 flex items-center justify-center gap-1 ${
                isOutOfStock
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-cyan-500/30 bg-slate-900/80 text-cyan-300 hover:bg-cyan-950/50 hover:border-cyan-400'
              }`}
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
