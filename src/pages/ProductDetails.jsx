import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingCart,
  Zap,
  Star,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  ArrowLeft,
  Share2,
  AlertCircle,
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Default package selection
  const defaultPackage = product?.packages && product.packages.length > 0 ? product.packages[0] : null;
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [quantity, setQuantity] = useState(1);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!product) {
    return (
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4 my-10 max-w-2xl mx-auto">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested gaming item or top-up package does not exist or was removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/30 hover:bg-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const activePackage = selectedPackage || (product.packages && product.packages[0]);
  const unitPrice = activePackage ? activePackage.price : product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock <= 0;

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
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Main Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#080d1a] border border-slate-800 rounded-3xl overflow-hidden p-3 shadow-xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              product={product}
              aspectRatio="aspect-[16/11]"
            />
          </div>

          {/* Key Selling Features */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">100% Genuine Digital Key / Top-Up</span>
                <span className="text-slate-400 text-[11px]">Direct activation to your account or Player ID</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300 pt-2 border-t border-slate-800/80">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Instant Delivery</span>
                <span className="text-slate-400 text-[11px]">Fast processing for Kurdistan & Iraq gamers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Title, Packages & Purchase Controls */}
        <div className="lg:col-span-7 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Header Badges & Share */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-500/20 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors relative"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
              {copiedNotification && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-cyan-500 text-black font-extrabold px-2 py-0.5 rounded shadow">
                  Link Copied!
                </span>
              )}
            </button>
          </div>

          {/* Title & Stats */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mt-2">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'} / 5.0</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Sold</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packages.map((pkg, idx) => {
                  const isSelected = activePackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0c1633] to-[#121e42] border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-[#0d1428] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{pkg.name}</p>
                        <p className="text-xs font-extrabold text-cyan-400 mt-0.5">
                          {formatPrice(pkg.price)}
                        </p>
                      </div>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Total Calculation */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Price
              </span>
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center bg-[#080d1a] border border-slate-700 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="px-3 text-sm font-extrabold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-black font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-xl font-black text-white uppercase font-mono mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
