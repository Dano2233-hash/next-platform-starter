import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle,
  Share2,
  Check,
} from 'lucide-react';

export default function ProductDetails({ products, onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">
          The requested product may have been moved or removed from our catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage?.oldPrice || (selectedPackage ? null : product.oldPrice);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media & Visual */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-2 overflow-hidden shadow-xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px]">Legit & Guaranteed</p>
                <p className="text-[10px] text-slate-400">100% Official Digital Key</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px]">Instant Delivery</p>
                <p className="text-[10px] text-slate-400">Fast processing time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Purchase Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6 bg-[#090d16] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          {/* Platform and Rating row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-black uppercase border border-cyan-500/40">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-bold uppercase border border-purple-500/30">
                {product.type}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition flex items-center gap-1.5 text-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-slate-200">{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount} Completed Orders</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : `${product.stock} Units Available`}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                <span>Select Package Option:</span>
                <span className="text-cyan-400 lowercase">{selectedPackage?.name}</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-200 line-clamp-1">{pkg.name}</span>
                      <span className="text-xs font-extrabold text-cyan-400">{formatPrice(pkg.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mt-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-300">{formatPrice(currentPrice)}</span>
                {currentOldPrice && (
                  <span className="text-xs text-slate-500 line-through font-semibold">
                    {formatPrice(currentOldPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">IQD Only</span>
          </div>

          {/* CTA Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onAddToCart && onAddToCart(product, selectedPackage)}
              disabled={isOutOfStock}
              className="py-4 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-sm border border-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => onBuyNow && onBuyNow(product, selectedPackage)}
              disabled={isOutOfStock}
              className="py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-black text-sm hover:brightness-110 shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* How it works info */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-400 mt-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" /> How will I receive my order?
            </h4>
            <ul className="space-y-1 list-disc list-inside text-[11px]">
              <li>For Mobile Top-Ups: Provide Player ID in order note for instant recharge.</li>
              <li>For Steam Games / Gift Cards: Digital code delivered via order confirmation & support.</li>
              <li>Pay conveniently with FastPay, Korek, or MasterCard in IQD.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <ProductSection
        title="You Might Also Like"
        subtitle="Similar products in Kurdistan gaming store"
        products={relatedProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}
