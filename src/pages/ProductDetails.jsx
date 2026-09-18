import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Gamepad2,
  Smartphone,
  AlertCircle
} from 'lucide-react';

export function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const activePrice = selectedPackage ? selectedPackage.price : product.price;
  const activeOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, selectedPackage, quantity);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="capitalize hover:text-cyan-400">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-bold truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Image Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 overflow-hidden shadow-2xl relative">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              heightClass="h-72 sm:h-96"
            />

            {/* Platform & Type overlay badges */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold px-3 py-1 rounded-lg">
                  {product.platform}
                </span>
                <span className="bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-extrabold px-3 py-1 rounded-lg">
                  {product.type}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {copiedLink && (
              <p className="text-emerald-400 text-xs font-bold text-center mt-2 animate-fade-in">
                Link copied to clipboard!
              </p>
            )}
          </div>

          {/* Guarantees Widget */}
          <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">100% Guaranteed</span>
                <span className="text-[10px] text-slate-400">Official legal code</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Instant Reload</span>
                <span className="text-[10px] text-slate-400">Fast delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Options & CTA */}
        <div className="lg:col-span-7 bg-[#090d16] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">

          {/* Title & Ratings */}
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                {product.rating || 5.0}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 text-xs font-medium">{product.soldCount || 0} orders completed</span>
              {product.tag && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-bold px-2.5 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {pkg.name}
                        </span>
                        {pkg.oldPrice && pkg.oldPrice > pkg.price && (
                          <span className="text-[10px] text-slate-500 line-through mr-1">
                            {formatPrice(pkg.oldPrice)}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-extrabold ${isSelected ? 'text-cyan-400' : 'text-slate-300'}`}>
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Summary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-0.5">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                    {formatPrice(activePrice * quantity)}
                  </span>
                  {activeOldPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(activeOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg text-base font-bold"
                >
                  -
                </button>
                <span className="text-sm font-extrabold w-6 text-center text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg text-base font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCartClick}
                disabled={isOutOfStock}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-slate-200 font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNowClick}
                disabled={isOutOfStock}
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 text-white font-black py-3.5 px-4 rounded-xl shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Delivery Details Note */}
          <div className="text-xs text-slate-400 space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="font-bold text-slate-200 block">Fast Manual Delivery Info:</span>
            <p>
              After placing your order, select FastPay, Korek, or MasterCard. Provide your Player ID in the order notes if applicable.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
