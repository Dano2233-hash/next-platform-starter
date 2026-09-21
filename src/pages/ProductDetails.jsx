import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Zap,
  ShieldCheck,
  ShoppingCart,
  ArrowLeft,
  Check,
  Share2,
  Clock,
  Sparkles,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you requested does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-cyan-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product.packages && product.packages.length > 0 ? product.packages[0] : { name: 'Standard', price: product.price };
  });

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Feature Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-4">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 w-full rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#090f1e] border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Instant Delivery</p>
                <p className="text-[10px] text-slate-400">Automated transfer</p>
              </div>
            </div>

            <div className="bg-[#090f1e] border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">100% Guaranteed</p>
                <p className="text-[10px] text-slate-400">Official license</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Selection, Price & Checkout */}
        <div className="lg:col-span-7 bg-[#090f1e] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-cyan-950 text-cyan-400 font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30 uppercase tracking-wider">
              {product.platform || 'Digital'}
            </span>
            <span className="bg-slate-900 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-800">
              {product.type || 'Digital Item'}
            </span>
            {product.tag && (
              <span className="bg-purple-950 text-purple-300 font-bold px-2.5 py-1 rounded-lg border border-purple-500/30">
                {product.tag}
              </span>
            )}
          </div>

          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'} / 5.0 Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount ? `${product.soldCount.toLocaleString()} Orders Completed` : 'Popular Item'}</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-cyan-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            <p>{product.description}</p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Package / Denomination *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                          {pkg.name}
                        </p>
                        <p className="text-[11px] font-extrabold text-slate-400 mt-0.5">
                          {formatPrice(pkg.price)}
                        </p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Total Price */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Price</span>
              <p className="text-2xl font-black text-cyan-400">{formatPrice(totalPrice)}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-cyan-400">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                isOutOfStock
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
                isOutOfStock
                  ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black shadow-lg shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Help box */}
          <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Need assistance with top-up or activation? Contact our 24/7 Kurdistan support team via WhatsApp or Discord after placing your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
