import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export const ProductDetails = ({ products = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-black text-slate-100">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const isOut = product.stock === 'out_of_stock';
  const unitPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 pt-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Previous
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#080d1a] shadow-2xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96 w-full"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg">
                {product.tag}
              </span>
            )}
          </div>

          {/* Key Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#080d1a] border border-slate-800/80 flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">Instant Delivery</div>
                <div className="text-[10px] text-slate-400">Automated digital send</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080d1a] border border-slate-800/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">100% Guaranteed</div>
                <div className="text-[10px] text-slate-400">Official digital license</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Specs & Ordering */}
        <div className="lg:col-span-7 space-y-6 bg-[#080d1a] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">

          {/* Header Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-purple-950 text-purple-400 border border-purple-800/40">
                {product.type}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-slate-800 text-slate-300">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating || 5.0} Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-semibold">
                {product.soldCount ? `${product.soldCount.toLocaleString()} Successful Orders` : 'High Demand'}
              </span>
              <span>•</span>
              <button
                onClick={handleShare}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <label className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Tag className="w-4 h-4" /> Select Package / Option
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage && selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border-cyan-400 ring-1 ring-cyan-400'
                          : 'bg-[#0b1021] hover:bg-[#0e162e] border-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-100 line-clamp-1">{pkg.name}</span>
                      <span className="text-xs font-extrabold text-cyan-300 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Price Total */}
          <div className="space-y-4 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Quantity</span>
                <div className="flex items-center bg-[#0b1021] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-extrabold text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Price</span>
                <div className="text-2xl font-black text-cyan-300">
                  {formatPrice(totalPrice)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOut}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700/60 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" /> Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOut}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 disabled:opacity-50 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950 cursor-pointer"
              >
                Buy Now Immediately
              </button>
            </div>
          </div>

          {/* Regional Payment Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Iraqi Payment Options Supported
            </div>
            <p className="text-[11px] leading-relaxed">
              Pay using <strong>FastPay</strong>, <strong>Korek</strong>, or <strong>MasterCard</strong>. Complete order setup to receive instant transfer instructions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
