import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  Zap,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
  Box,
  Gamepad2,
  Monitor,
  CreditCard,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The game or top-up item you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    platform,
    type,
    price,
    oldPrice,
    description,
    image,
    packages = [],
    stock = 0,
    rating = 5.0,
    soldCount = 0,
    tag
  } = product;

  const isOutOfStock = stock <= 0;
  const currentPkg = packages[selectedPkgIndex] || { name: 'Standard', price };
  const currentPrice = currentPkg.price || price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product, currentPkg, quantity);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product, currentPkg, quantity);
    } else if (onAddToCart) {
      onAddToCart(product, currentPkg, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Previous Page</span>
      </button>

      {/* Main product view grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Image & Features (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 shadow-xl overflow-hidden">
            <ProductImage
              src={image}
              alt={name}
              name={name}
              category={category}
              platform={platform}
              type={type}
              className="w-full h-80 object-cover rounded-xl"
              aspectRatio="aspect-square"
            />
          </div>

          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-slate-200 font-extrabold text-xs uppercase tracking-wider">
              Product Guarantees
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Verified Direct Digital Key / Direct Top-Up</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast Manual Delivery via WhatsApp/Korek/FastPay</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed Support for Kurdistan & Iraq Accounts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info & Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          <div className="space-y-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                {platform}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider">
                {type}
              </span>
              {tag && (
                <span className="px-3 py-1 rounded-md bg-purple-600 text-white text-xs font-extrabold uppercase tracking-wide">
                  {tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{name}</h1>

            {/* Rating and Sold */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{rating.toFixed(1)} / 5.0 Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300">{soldCount.toLocaleString()} Orders Delivered</span>
              <span>•</span>
              <span className={stock > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed pt-2">
              {description}
            </p>
          </div>

          {/* Package Tier Selection */}
          {packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Package / Quantity Option:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`relative p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border-cyan-400 text-white shadow-lg shadow-cyan-950/40 scale-[1.02]'
                          : 'bg-[#090d1a] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute -top-2 right-2 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                      <span className="block text-xs font-bold text-slate-100 truncate">{pkg.name}</span>
                      <span className="block text-sm font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quantity:
            </label>
            <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-black text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price Summary & Purchase Action */}
          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Price</span>
                <div className="text-2xl font-black text-cyan-400 mt-0.5">
                  {formatPrice(totalPrice)}
                </div>
              </div>
              <span className="text-xs text-slate-400">
                Package: <strong className="text-slate-200">{currentPkg.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800 font-extrabold text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add To Cart</span>
              </button>

              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now Direct</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
