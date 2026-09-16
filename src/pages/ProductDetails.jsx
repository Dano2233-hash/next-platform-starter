import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Star, ShoppingBag, Zap, ShieldCheck, Check, AlertCircle, ArrowLeft, Heart, Share2 } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const { getProductBySlug } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const product = getProductBySlug(slug);

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Back to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'p1', name: 'Standard Package', price: product.price, oldPrice: product.oldPrice }];

  const currentPkg = packages[selectedPkgIndex] || packages[0];
  const currentPrice = currentPkg.price;
  const currentOldPrice = currentPkg.oldPrice || product.oldPrice;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPkg, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPkg, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back button breadcrumb */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left image column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0d1322] border border-slate-800 rounded-3xl p-4 shadow-xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96 w-full rounded-2xl"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Official Publisher Digital Delivery Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Instant Code / UID Top-Up Processing</span>
            </div>
          </div>
        </div>

        {/* Right product options column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{product.rating || 5.0}</span>
                <span className="text-slate-400">Rating</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="text-slate-300">
                <span className="font-bold text-cyan-400">{product.soldCount || 0}</span> Units Delivered
              </div>
              <span className="text-slate-600">•</span>
              <div>
                {isOutOfStock ? (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} available)
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {packages.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Select Package / Amount
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {packages.length} Option{packages.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={pkg.id || idx}
                      type="button"
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{pkg.name}</div>
                      <div className="text-xs font-extrabold text-cyan-400 mt-1 font-mono">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Header Banner */}
          <div className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Selected Package Price</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-cyan-300 font-sans">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOldPrice && currentOldPrice > currentPrice && (
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Qty:</span>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-300 hover:text-white"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-white font-mono">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-300 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border-slate-800'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700 active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
