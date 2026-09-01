import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Zap,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Layers,
  Sparkles,
  PackageCheck
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const activePackage = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : { id: 'default', name: 'Standard', price: product.price });
  const isOutOfStock = product.stock <= 0;
  const unitPrice = activePackage.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Navigation Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Product ID: {product.id}
        </span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-900/30 bg-[#070c26] shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-72 sm:h-96"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-black/80 text-cyan-300 px-3 py-1 rounded-lg border border-cyan-500/30 backdrop-blur-md">
                {product.platform}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-950/80 text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30 backdrop-blur-md">
                {product.type}
              </span>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#080d2b] border border-cyan-900/30 flex items-center gap-2.5 text-slate-300">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Instant Code / UID Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-[#080d2b] border border-cyan-900/30 flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>100% Legal & Official</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchasing */}
        <div className="lg:col-span-7 space-y-6 bg-[#080e2d]/60 border border-cyan-900/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/30">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating and Social Proof */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || 4.9} Customer Rating</span>
              </div>
              <span>•</span>
              <span className="font-semibold">{product.soldCount || 250}+ successful orders</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock & Ready'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package / Variant Picker */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Select Package / Amount</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = activePackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-[#05091c] border-slate-800 hover:border-cyan-700/60 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-100">{pkg.name}</div>
                      <div className="text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="space-y-2 border-t border-slate-800/80 pt-4">
            <label className="text-xs font-bold text-slate-300">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#05081c] border border-cyan-900/40 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-900 text-slate-200 font-bold flex items-center justify-center hover:bg-slate-800"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold font-mono text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-900 text-slate-200 font-bold flex items-center justify-center hover:bg-slate-800"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Subtotal: <strong className="text-white">{formatPrice(totalPrice)}</strong>
              </span>
            </div>
          </div>

          {/* Pricing & CTA Action Section */}
          <div className="border-t border-slate-800/80 pt-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Local IQD Payment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-4 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 hover:scale-[1.01]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Instant Checkout)</span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-4 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all border ${
                  isOutOfStock
                    ? 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed'
                    : 'border-cyan-500/40 bg-[#071338] hover:bg-cyan-950 text-cyan-300 hover:border-cyan-400'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-cyan-900/30 pt-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-cyan-400" />
            <span>Related Digital Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
