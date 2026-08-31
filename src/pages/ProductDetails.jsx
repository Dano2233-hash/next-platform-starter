import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  Package,
  Clock,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The requested product could not be found or has been removed.</p>
        <Link
          to="/products"
          className="inline-block px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Visual/Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-96 shadow-2xl" />

          {/* Guarantee Badges */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">100% Genuine Digital Code / Top-up</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Instant manual processing after payment verification</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Customer support on WhatsApp, Discord & TikTok</span>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Selection */}
        <div className="lg:col-span-7 space-y-6 bg-slate-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-xl">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-black uppercase rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {product.platform}
            </span>
            <span className="px-3 py-1 text-xs font-black uppercase rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30">
              {product.type}
            </span>
            {isOutOfStock ? (
              <span className="px-3 py-1 text-xs font-black uppercase rounded-lg bg-red-950 text-red-400 border border-red-800">
                Out of Stock
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                In Stock ({product.stock})
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {product.name}
          </h1>

          {/* Rating & Sales */}
          <div className="flex items-center gap-6 text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
              <span className="text-slate-400 font-normal">(Customer Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{product.soldCount || 0} Delivered</span>
            </div>
          </div>

          {/* Price Header */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatPrice(currentPrice)}
                </span>
                {currentOldPrice && (
                  <span className="text-sm text-slate-500 line-through font-semibold">
                    {formatPrice(currentOldPrice)}
                  </span>
                )}
              </div>
            </div>
            {selectedPackage && (
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
                {selectedPackage.name}
              </span>
            )}
          </div>

          {/* Packages Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <Package className="w-4 h-4 text-cyan-400" />
                Select Package / Option *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-xs">{pkg.name}</span>
                      <span className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-slate-400 hover:text-white font-bold text-base"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-cyan-300">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 text-slate-400 hover:text-white font-bold text-base"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Total: <strong className="text-white">{formatPrice(currentPrice * quantity)}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Product Description
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
              {product.description}
            </p>
          </div>

          {/* Toast Notification */}
          {addedToast && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Added to cart successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-6 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-6 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/25'
              }`}
            >
              <Zap className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
