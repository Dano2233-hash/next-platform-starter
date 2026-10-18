import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  ShoppingCart,
  Zap,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Share2,
  HelpCircle,
  PackageCheck
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  // Find product by id or slug
  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-xs">
          The requested gaming item or top-up does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-cyan-400 font-bold text-xs rounded-xl border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Item', price: product.price }];

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedToast, setCopiedToast] = useState(false);

  const selectedPkg = packages[selectedPkgIndex] || packages[0];
  const unitPrice = selectedPkg ? selectedPkg.price : product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold cursor-pointer transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>{copiedToast ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-[#0b0f1d] border border-slate-800 rounded-2xl p-4 overflow-hidden">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-80 sm:h-96 object-cover rounded-xl"
            />

            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900/90 text-slate-200 text-xs font-extrabold border border-slate-700 backdrop-blur-md">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-950/90 text-cyan-300 text-xs font-extrabold border border-cyan-500/40 backdrop-blur-md">
                {product.type}
              </span>
            </div>

            {isOutOfStock && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
                <span className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl text-sm font-bold uppercase tracking-wider">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Guarantees Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Official Genuine Key</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instant ID / Key Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Kurdistan Region Support</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>100% Guaranteed Active</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Package Selection */}
        <div className="lg:col-span-7 bg-[#0b0f1d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            {/* Tag & Stats */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                {product.tag || 'Official Product'}
              </span>

              <div className="flex items-center gap-3">
                <span>{product.soldCount || 0} orders completed</span>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating || '4.9'}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Price Showcase */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-cyan-400 tracking-tight">
                {formatPrice(totalPrice)}
              </span>
              {product.oldPrice && (
                <span className="text-slate-500 line-through text-sm font-semibold">
                  {formatPrice(product.oldPrice * quantity)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-800/80 pt-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection Tiers */}
          <div className="border-t border-slate-800/80 pt-4 space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Package / Tier ({packages.length})
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPkgIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPkgIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold line-clamp-1">{pkg.name}</div>
                    <div className="text-cyan-400 text-xs font-extrabold mt-1">
                      {formatPrice(pkg.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quantity
            </span>

            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-800/80 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Now ({formatPrice(totalPrice)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 space-y-4 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
