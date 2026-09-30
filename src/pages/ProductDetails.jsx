import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Zap,
  ShoppingBag,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Layers,
  ChevronLeft,
  Share2,
  Clock,
  Sparkles,
} from 'lucide-react';
import ProductImage from '../components/ProductImage';
import ProductVisual from '../components/ProductVisual';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Initialize selected package when product loads
  React.useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPkg(product.packages[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or was removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
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
    tag,
    isComingSoon = false,
  } = product;

  const currentPrice = selectedPkg ? selectedPkg.price : price;
  const currentOldPrice = selectedPkg ? selectedPkg.oldPrice : oldPrice;
  const isOutOfStock = stock <= 0 && !isComingSoon;

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, selectedPkg, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, selectedPkg, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Back Button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Image / Visual Container */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1024] border border-slate-800 rounded-2xl p-3 shadow-2xl relative">
            <ProductImage
              src={image}
              name={name}
              category={category}
              platform={platform}
              type={type}
              heightClass="h-72 sm:h-96"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Genuine Code</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Right Product Buying Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {platform}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {type}
              </span>
              {tag && (
                <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{rating}</span>
              </div>
              <span>•</span>
              <span className="text-slate-300">{soldCount}+ Orders Delivered</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">In Stock ({stock})</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {description}
          </p>

          {/* Package Selector (if packages exist) */}
          {packages && packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option *</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg) => {
                  const isSelected = selectedPkg?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{pkg.name}</span>
                      <span className="text-xs font-extrabold text-cyan-300 mt-1 block">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Total Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-300">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white px-2 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isComingSoon}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-40"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now (Instant Order)</span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isComingSoon}
                className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Average delivery time: 2 - 15 minutes</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Supported methods: FastPay, Korek, MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
