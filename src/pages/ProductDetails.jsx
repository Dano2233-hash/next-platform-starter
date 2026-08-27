import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  PackageCheck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle
} from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-12 text-center my-12">
        <h2 className="text-xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-xl"
        >
          Back to Store
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

  const currentPrice = selectedPackage ? selectedPackage.price : price;
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedPackage, quantity);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span>/</span>
        <Link to="/products" className="hover:text-cyan-400">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold truncate max-w-[200px]">
          {name}
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0a0f1d] border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Left Image & Fallback Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[16/10] sm:aspect-square w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl">
            <ProductImage
              src={image}
              alt={name}
              category={category}
              platform={platform}
              className="w-full h-full"
            />
            {tag && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">
                {tag}
              </span>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-200 block">100% Guaranteed</span>
                <span className="text-[10px] text-slate-400">Official Publisher Digital Codes</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-200 block">Fast Delivery</span>
                <span className="text-[10px] text-slate-400">Instant manual code dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Product Options & Info */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Platform Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                {platform}
              </span>
              <span className="bg-slate-900 border border-slate-700 text-purple-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                {type}
              </span>
              <span className="text-xs text-slate-400 ml-auto flex items-center gap-1 font-semibold">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-slate-200">{rating.toFixed(1)}</span>
                <span className="text-slate-500">({soldCount.toLocaleString()} sold)</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {name}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              {description}
            </p>

            {/* Package Selection Options */}
            {packages && packages.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-cyan-400" />
                  Select Package Amount:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-slate-900 to-blue-950 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-2 right-2" />
                        )}
                        <span className="text-xs font-bold block mb-1 pr-4">{pkg.name}</span>
                        <span className="text-xs font-extrabold text-cyan-400">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price & Stock Display */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Selected Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {oldPrice && oldPrice > price && !selectedPackage && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(oldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {isOutOfStock ? (
                  <span className="bg-rose-950 text-rose-300 border border-rose-500/50 text-xs font-bold px-3 py-1.5 rounded-lg">
                    Out of Stock
                  </span>
                ) : (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    In Stock ({stock})
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-slate-400 hover:text-white text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-black text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now (Instant Checkout)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
