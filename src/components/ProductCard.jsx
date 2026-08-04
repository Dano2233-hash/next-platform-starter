import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const minPrice = product.packages && product.packages.length > 0
    ? Math.min(...product.packages.map(p => p.price))
    : product.price;

  const minOldPrice = product.oldPrice || null;

  // Calculate discount percentage if old price is present
  const discount = minOldPrice && minOldPrice > minPrice
    ? Math.round(((minOldPrice - minPrice) / minOldPrice) * 100)
    : null;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.packages && product.packages.length > 0) {
      // Add the first package to cart and navigate to checkout
      onAddToCart(product, product.packages[0], 1);
      navigate('/checkout');
    } else {
      // In case of no packages
      onAddToCart(product, { id: 'default', name: 'Standard', price: product.price }, 1);
      navigate('/checkout');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.packages && product.packages.length > 0) {
      onAddToCart(product, product.packages[0], 1);
    } else {
      onAddToCart(product, { id: 'default', name: 'Standard', price: product.price }, 1);
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col bg-[#0c0d12]/90 border border-[#1a1e29] hover:border-[#00e5ff]/30 hover:bg-[#0c0d12] rounded-xl overflow-hidden transition-all duration-300 shadow-xl"
    >
      {/* Discount Badge */}
      {discount && !isOutOfStock && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold text-white bg-gradient-to-r from-[#7000ff] to-[#0066ff] px-2 py-0.5 rounded-full shadow">
          {discount}% OFF
        </span>
      )}

      {/* Out of stock badge */}
      {isOutOfStock && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold text-gray-300 bg-red-600/80 px-2 py-0.5 rounded-full shadow">
          OUT OF STOCK
        </span>
      )}

      {/* Product Image Section */}
      <div className="relative overflow-hidden aspect-[16/10] bg-[#050505]">
        <ProductImage product={product} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Card Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Platform & Type Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-white bg-[#151824] px-2 py-0.5 rounded border border-[#1a1e29]">
              {product.platform}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#00e5ff] bg-[#00e5ff]/5 px-2 py-0.5 rounded border border-[#00e5ff]/15">
              {product.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#00e5ff] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
            {product.description}
          </p>

          {/* Ratings & Sold Count & Package Count */}
          <div className="flex items-center gap-2 mt-2.5 text-[10px] text-gray-400">
            <div className="flex items-center gap-0.5 text-yellow-500">
              <Star size={10} fill="currentColor" />
              <span className="font-bold text-gray-300">{product.rating}</span>
            </div>
            <span>•</span>
            <span>{product.soldCount}+ Sold</span>
            {product.packages && product.packages.length > 0 && (
              <>
                <span>•</span>
                <span className="text-[#00e5ff] font-semibold">{product.packages.length} Packs</span>
              </>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#1a1e29]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Price From</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#00e5ff]">
                  {formatPrice(minPrice)}
                </span>
                {minOldPrice && (
                  <span className="text-[10px] text-gray-500 line-through">
                    {formatPrice(minOldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg border border-[#1a1e29] hover:bg-[#151824] hover:text-white text-gray-300 transition-colors cursor-pointer select-none ${
                isOutOfStock ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''
              }`}
              title="Add to Cart"
            >
              <ShoppingCart size={13} />
              Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-lg text-white bg-[#0066ff] hover:bg-[#0052cc] transition-colors cursor-pointer select-none ${
                isOutOfStock ? 'bg-gray-800 text-gray-500 cursor-not-allowed hover:bg-gray-800' : ''
              }`}
            >
              Buy
              <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
