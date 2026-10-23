import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  ArrowLeft,
  Info,
  Clock,
  Package
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug } = useProducts();
  const { addToCart, openCart } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const unitPrice = currentPackage.price !== undefined ? currentPackage.price : product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Visual/Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-2 shadow-2xl">
            <ProductImage product={product} className="h-72 sm:h-96" />
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-3 text-emerald-400 font-semibold">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>100% Guaranteed Official Digital Delivery</span>
            </div>
            <div className="flex items-center space-x-3 text-amber-400 font-semibold">
              <Clock className="w-5 h-5 shrink-0" />
              <span>Instant Code / Top-Up Processing</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-400 font-semibold">
              <Zap className="w-5 h-5 shrink-0" />
              <span>FastPay, Korek & MasterCard Accepted</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          {/* Title & Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                {product.platform}
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{product.name}</h1>

            <div className="flex items-center space-x-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">{product.rating || '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-slate-300">{product.soldCount || 0} Orders Completed</span>
              <span>•</span>
              <span className={`font-extrabold ${isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium pt-2 border-t border-slate-800">
            {product.description}
          </p>

          {/* Package Selection Tiles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package / Quantity Option</span>
              </label>
              <span className="text-xs text-slate-400 font-semibold">{packages.length} Options Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="font-extrabold text-white text-xs">{pkg.name}</h4>
                      <p className="text-xs font-black text-cyan-400 mt-0.5">{formatPrice(pkg.price)}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity Controls & Price Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Quantity</span>
              <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-black text-white px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Total Price</span>
              <span className="text-2xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-slate-100 font-extrabold text-xs flex items-center justify-center space-x-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/20 transition-all"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
