import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Info,
  PackageCheck
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested item may have been removed or does not exist.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const hasPackages = product.packages && product.packages.length > 0;
  const [selectedPackage, setSelectedPackage] = useState(
    hasPackages ? product.packages[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedPackage
    ? selectedPackage.price
    : product.price;

  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left Column: Image Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-full"
            />

            {/* Platform & Type Overlay Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-700/80 text-cyan-400 backdrop-blur-md">
                {product.platform}
              </span>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-700/80 text-purple-400 backdrop-blur-md">
                {product.type}
              </span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Official Key & Top-Up</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <span>Instant Local Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <span>{product.tag || 'Official Item'}</span>
              <span>&bull;</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating || '4.9'} ({product.soldCount || 100}+ sold)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {product.name}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection Row if available */}
          {hasPackages && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-cyan-400" />
                  Select Package Option
                </label>
                <span className="text-[11px] text-slate-400">
                  {product.packages.length} choices available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{pkg.name}</div>
                      <div className="text-cyan-400 font-extrabold text-xs mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 py-2 border-t border-b border-slate-800/80">
            <span className="text-xs font-bold text-slate-300">Quantity:</span>
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-black text-slate-100">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Price & Primary CTA */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Price:
              </span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(currentPrice * quantity)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                <Zap className="w-4 h-4" /> Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-slate-100 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" /> Add to Cart
              </button>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Manual payment via FastPay, Korek, or MasterCard on checkout.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
