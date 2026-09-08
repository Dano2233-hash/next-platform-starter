import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Star,
  ShieldCheck,
  Package,
  Plus,
  Minus,
  CheckCircle2,
  ArrowLeft,
  Share2,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();

  const product = products.find(
    (p) => p.slug === slug || p.id === slug
  );

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product, slug]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested product may have been moved or is no longer available.
        </p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-slate-800 text-cyan-400 font-bold text-xs"
        >
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    openCart();
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

  // Related products from same category or platform
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Breadcrumb & Back Link */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 hover:text-cyan-400 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Copied Link!' : 'Share Product'}</span>
        </button>
      </div>

      {/* Main Grid: Image + Order Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8">

        {/* Left Column: Product Visual */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-96" />

          {/* Guarantee Badges Box */}
          <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>100% Genuine & Verified Activation Code</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Fast Manual Processing via Kurdistan Agent</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Full Refund Warranty on Invalid Codes</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Package Selection & Purchase CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
                {product.platform}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-900/60 text-blue-200 border border-blue-700/50">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-purple-900/60 text-purple-200 border border-purple-700/50">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Title & Ratings */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating || '5.0'}</span>
                </div>
                <span>•</span>
                <span>{product.soldCount?.toLocaleString()} Orders Completed</span>
                <span>•</span>
                <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
              {product.description}
            </p>

            {/* Package Selection */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>Select Package Denomination:</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border-cyan-400 ring-1 ring-cyan-400 text-white shadow-lg'
                            : 'bg-[#0b1222] border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold truncate">{pkg.name}</p>
                        <p className="text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Adjuster */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Quantity:
              </span>
              <div className="flex items-center gap-3 bg-[#0b1222] border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Total Price & Primary Actions */}
          <div className="bg-[#0b1222] p-5 rounded-2xl border border-slate-800 space-y-4 mt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Amount:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOldPrice && currentOldPrice > currentPrice && (
                  <span className="block text-xs text-slate-500 line-through">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 active:scale-95'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-cyan-950/50 active:scale-95'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
