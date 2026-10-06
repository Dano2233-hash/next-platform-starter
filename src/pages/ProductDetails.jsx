import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Layers,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = getProductBySlug(slug);

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
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or was removed.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related products in same category or platform
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 sm:p-8">
        {/* Left Image Column */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-96" />

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="block font-bold text-slate-400 text-[10px]">Platform</span>
              <span className="font-extrabold text-cyan-400">{product.platform}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="block font-bold text-slate-400 text-[10px]">Type</span>
              <span className="font-extrabold text-purple-400">{product.type}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="block font-bold text-slate-400 text-[10px]">Rating</span>
              <div className="flex items-center justify-center gap-1 font-extrabold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header tags */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-400 text-xs font-extrabold border border-cyan-800/50">
                  {product.category}
                </span>
                {product.tag && (
                  <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-md">
                    {product.tag}
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            {/* Title & Sold Count */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{product.name}</h1>
              <p className="text-xs text-slate-400 mt-1">
                {product.soldCount || 350}+ orders completed successfully
              </p>
            </div>

            {/* Price display */}
            <div className="p-4 rounded-2xl bg-[#05070f] border border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Selected Price</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-300">
                  {formatPrice(currentPrice)}
                </span>
              </div>
              {currentOldPrice && currentOldPrice > currentPrice && (
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Regular Price</span>
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(currentOldPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Package Selection */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Choose Package / Amount</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg, idx) => {
                    const isSelected = selectedPackage && selectedPackage.name === pkg.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 font-extrabold ring-1 ring-cyan-500 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-xs">{pkg.name}</span>
                        <span className="block text-[11px] text-cyan-400/90 font-bold mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Product Description
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#05070f] p-4 rounded-xl border border-slate-800">
                {product.description || 'Full digital key or top-up service directly credited to your account after payment confirmation.'}
              </p>
            </div>
          </div>

          {/* Action Buttons & Stock */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border ${
                  isOutOfStock
                    ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/50 active:scale-95'
                }`}
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Automated Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Legal Digital Key</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xl font-black text-slate-100">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
