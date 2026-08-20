import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Package,
  ArrowLeft,
  Share2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
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
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested game or top-up product could not be found or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages || [];
  const activePrice = selectedPackage ? selectedPackage.price : product.price;
  const activeOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;

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

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedPackage);
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedPackage);
    } else {
      if (onAddToCart) onAddToCart(product, selectedPackage);
      navigate('/checkout');
    }
  };

  return (
    <div className="space-y-12">
      {/* Back Button & Navigation */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 md:p-8">
        {/* Left Column: Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-72 md:h-80"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Legal & Official Digital License</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Direct digital delivery for Kurdistan & Iraq. Verified payment safety with FastPay, Korek & MasterCard.
            </p>
          </div>
        </div>

        {/* Right Column: Title, Package Selector & Buy Actions */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div>
            {/* Platform & Category Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-bold rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded bg-slate-900 text-slate-300 border border-slate-800 uppercase">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 text-xs font-extrabold rounded bg-purple-950 text-purple-300 border border-purple-800/60 uppercase">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sold Count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'}</span>
              </div>
              <span>|</span>
              <span>{product.soldCount.toLocaleString()} Total Orders</span>
              <span>|</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            {/* Product Description */}
            <div className="py-4 text-xs md:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </div>

            {/* Package Selector */}
            {packages.length > 0 && (
              <div className="space-y-3 py-4 border-t border-slate-800">
                <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>Select Package / Option:</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-xs truncate">{pkg.name}</p>
                        <p className="text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-black text-cyan-400">
                {formatPrice(activePrice)}
              </span>
              {activeOldPrice > activePrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(activeOldPrice)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || product.isComingSoon}
                className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-xs md:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || product.isComingSoon}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs md:text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
              </button>

              <span className="text-[11px] text-slate-500">
                Instant delivery upon manual payment verification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You May Also Like"
          subtitle="Similar game top-ups and digital titles"
          products={relatedProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}
    </div>
  );
}
