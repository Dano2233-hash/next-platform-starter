import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Tag, ShieldCheck, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const packagesCount = product.packages ? product.packages.length : 1;
  const defaultPackage = product.packages?.[0] || { name: 'Standard', price: product.price };

  const calculateDiscount = () => {
    if (product.oldPrice && product.oldPrice > product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return null;
  };

  const discountPercent = calculateDiscount();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultPackage, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultPackage, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-[#090e1a] hover:bg-[#0d1425] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10">

      {/* Top Media / Visual Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[16/10] overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          name={product.name}
          category={product.category}
          platform={product.platform}
          className="w-full h-full"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Platform Badge */}
            <span className="bg-[#050811]/90 backdrop-blur-md text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-wider">
              {product.platform || 'Digital'}
            </span>
            {/* Type Badge */}
            <span className="bg-purple-950/90 backdrop-blur-md text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30 uppercase tracking-wider">
              {product.type || 'Service'}
            </span>
          </div>

          {/* Special Tag or Discount Badge */}
          {discountPercent ? (
            <span className="bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
              -{discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-blue-400/30 uppercase tracking-wider">
              {product.tag}
            </span>
          ) : null}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="bg-red-950/90 text-red-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/40 uppercase tracking-wider shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Sub Header (Rating, Sold, Package Count) */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-slate-500 font-normal">({product.soldCount || 120} sold)</span>
            </div>
            {packagesCount > 1 && (
              <span className="text-[10px] font-medium bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                {packagesCount} Options
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-cyan-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-base line-clamp-1 font-sans">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Section */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {packagesCount > 1 ? 'From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-cyan-300 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 disabled:opacity-50 text-slate-200 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700/50"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 disabled:opacity-50 text-black py-2 rounded-xl text-xs font-black transition-all shadow-md shadow-cyan-500/20"
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
