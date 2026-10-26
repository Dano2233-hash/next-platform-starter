import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, CheckCircle, Zap } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packageCount = product.packages ? product.packages.length : 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  // Badge styling for platforms
  let platformStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (product.platform === "Xbox") platformStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (product.platform === "PlayStation") platformStyle = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  if (product.platform === "Mobile") platformStyle = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
  if (product.platform === "Gift Card") platformStyle = "bg-purple-500/10 text-purple-400 border-purple-500/20";

  return (
    <div className="group relative bg-[#090e1f] border border-slate-800/90 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <Link to={`/product/${product.slug}`} className="block relative overflow-hidden bg-slate-950 p-2">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="w-full h-40 object-cover rounded-xl"
          />

          {/* Badges Bar */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border shadow-md backdrop-blur-md ${platformStyle}`}>
              {product.platform}
            </span>

            {product.tag ? (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md">
                {product.tag}
              </span>
            ) : product.oldPrice && product.oldPrice > product.price ? (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-red-600 text-white shadow-md">
                Sale
              </span>
            ) : null}
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content Body */}
        <div className="p-4 space-y-2.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
              {product.type} • {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
            </span>
            <div className="flex items-center space-x-1 text-amber-400 font-bold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-slate-400 text-[10px]">({product.soldCount || '50+'})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
            {product.description}
          </p>

          {/* Price Row */}
          <div className="pt-1 flex items-baseline justify-between border-t border-slate-800/60">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-sm font-extrabold text-cyan-400">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Action Footer */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="flex items-center justify-center space-x-1 py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-semibold"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>+ Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center space-x-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
