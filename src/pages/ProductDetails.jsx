import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { Star, Shield, Zap, ShoppingCart, ArrowLeft, Layers } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function ProductDetails({ slug, navigate, onBack }) {
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-zinc-500">The product you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const hasPackages = product.packages && product.packages.length > 0;

  // Selected package state (default to first package if packages exist)
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (hasPackages) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product, hasPackages]);

  // Determine current active price
  const activePrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    alert(`${product.name}${selectedPackage ? ` (${selectedPackage.name})` : ''} added to cart!`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Back navigation */}
      <button
        onClick={onBack || (() => navigate('/products'))}
        className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to catalog</span>
      </button>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Col - Product Visual/Image (lg:span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0d0d12] border border-white/5 p-4 rounded-3xl shadow-xl">
            <ProductImage product={product} className="h-64 sm:h-80 md:h-96 rounded-2xl w-full" />
          </div>

          {/* Quick trust badges */}
          <div className="bg-[#0d0d12] border border-white/5 p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <Shield className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Tested & Activated regional gaming distribution.</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <Zap className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              <span>Instant digital transfer to Kurdish mobile networks.</span>
            </div>
          </div>
        </div>

        {/* Right Col - Details & Selectors (lg:span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tags / Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-950/50 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md">
              {product.platform}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-950/50 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md">
              {product.type}
            </span>
            {product.tag && (
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-950/50 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">{product.name}</h1>
            {/* Rating */}
            <div className="flex items-center gap-4 mt-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                <span>/ 5.0</span>
              </div>
              <span>•</span>
              <span>{product.soldCount}+ Sold</span>
              <span>•</span>
              <span className={`${isOutOfStock ? 'text-red-400' : 'text-emerald-400'} font-bold`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-[#0d0d12]/50 border border-white/5 p-4 rounded-2xl">
            <span className="text-xs text-zinc-500 block">Active Price</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl font-black text-[#00e5ff]">
                {formatPrice(activePrice * quantity)}
              </span>
              {product.oldPrice && !selectedPackage && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatPrice(product.oldPrice * quantity)}
                </span>
              )}
            </div>
            {selectedPackage && (
              <p className="text-[11px] text-zinc-500 mt-1">
                Selected package: <strong className="text-white">{selectedPackage.name}</strong> at {formatPrice(selectedPackage.price)} each.
              </p>
            )}
          </div>

          {/* Package Selection */}
          {hasPackages && (
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Choose Package / Denomination</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPackage(pkg)}
                      disabled={isOutOfStock}
                      className={`flex flex-col text-left p-3 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-950/20 text-white'
                          : 'bg-[#0d0d12] border-white/5 hover:bg-white/[0.02] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{pkg.name}</span>
                      <span className="text-[11px] font-semibold text-cyan-400 mt-1">{formatPrice(pkg.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Select Quantity</h3>
            <div className="flex items-center gap-3 bg-[#0d0d12] border border-white/5 rounded-2xl p-2 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock || quantity <= 1}
                className="w-8 h-8 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-sm font-bold px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={isOutOfStock}
                className="w-8 h-8 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl border transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-zinc-900 border-none text-zinc-600 cursor-not-allowed'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-white border-white/10'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 font-black py-4 px-6 rounded-2xl transition-all duration-200 shadow-xl ${
                isOutOfStock
                  ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/10'
              }`}
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Purchase / Checkout Now</span>
            </button>
          </div>

          {/* Full description */}
          <div className="border-t border-white/5 pt-6 text-xs text-zinc-500 space-y-3 leading-relaxed">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Product Description & Terms</h4>
            <p>{product.description}</p>
            <p>
              By purchasing this product, you agree that this is a manual delivery process. After completing checkout, please get in touch with Dano Store customer support via WhatsApp or Discord to complete processing and receive activation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
