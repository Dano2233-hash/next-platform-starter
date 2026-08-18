import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Check,
  ArrowLeft,
  PackageCheck,
  Clock,
  Share2,
  HelpCircle,
  Headphones
} from 'lucide-react';

export function ProductDetails({ products, onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-black text-white mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all"
        >
          Back to Store
        </Link>
      </div>
    );
  }

  const [selectedPkg, setSelectedPkg] = useState(
    product.packages?.[0] || { id: 'std', name: 'Standard Package', price: product.price }
  );
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPkg ? selectedPkg.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPkg, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPkg, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Image Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-hidden shadow-2xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96 rounded-xl"
            />

            {/* Platform & Type Badges */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-950 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-extrabold uppercase">
                  {product.platform}
                </span>
                <span className="px-3 py-1 bg-slate-950 text-purple-400 border border-purple-500/30 rounded-lg text-xs font-extrabold uppercase">
                  {product.type}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Title & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 text-xs font-bold uppercase rounded border border-cyan-500/30">
                {product.tag || 'Official Digital'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
                {product.soldCount || 100}+ Satisfied Customers
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-lg font-extrabold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 5.0} Rating</span>
              </div>

              <div className="flex items-center gap-1 text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant Code / Direct Top-Up</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-sm text-slate-300 leading-relaxed">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Description
            </h4>
            <p>{product.description}</p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <span>Select Package / Amount</span>
                <span className="text-cyan-400">*</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-500/30'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                          <Check className="w-3 h-3 text-black stroke-[3]" />
                        </div>
                      )}
                      <p className="font-bold text-xs pr-4 line-clamp-1">{pkg.name}</p>
                      <p className="text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase">Quantity</span>
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
              >
                -
              </button>
              <span className="px-4 text-sm font-black text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
              >
                +
              </button>
            </div>

            <div className="ml-auto text-right">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Total Price</span>
              <span className="text-xl font-black text-white">
                {formatPrice(currentPrice * quantity)}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-4 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 border transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-4 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-cyan-950/50'
              }`}
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Customer Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>100% Genuine Digital Code / Top-Up</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              <Headphones className="w-5 h-5 text-purple-400 shrink-0" />
              <span>Instant Support on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
