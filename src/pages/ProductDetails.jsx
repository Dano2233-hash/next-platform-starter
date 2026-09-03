import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Selected package state
  const hasPackages = product?.packages && product.packages.length > 0;
  const [selectedPackage, setSelectedPackage] = useState(
    hasPackages ? product.packages[0] : null
  );
  const [quantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The requested item does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (!product.stock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (!product.stock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(false);
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
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-200">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-slate-200">Products</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-2 shadow-2xl">
            <ProductImage product={product} className="h-72 sm:h-96" />
          </div>

          {/* Key info badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="font-bold text-slate-200 text-[11px]">100% Guaranteed</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <Clock className="w-5 h-5 text-cyan-400 mx-auto" />
              <span className="font-bold text-slate-200 text-[11px]">Instant Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mx-auto" />
              <span className="font-bold text-slate-200 text-[11px]">Iraq Support</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Buying Controls */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-bold text-xs">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-bold text-xs">
                {product.category}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/60 font-bold text-xs">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200">{product.rating}</span>
                <span>({product.soldCount} completed orders)</span>
              </div>
              <span>•</span>
              <span className={product.stock ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {product.stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Packages selection if available */}
          {hasPackages && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Package Option:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg, index) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{pkg.name}</div>
                      <div className="text-xs text-cyan-400 font-extrabold mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Buying box */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={!product.stock}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60"
              >
                <Zap className="w-4 h-4 fill-current" />
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <ShoppingCart className="w-4 h-4" />
                Add To Cart
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-800/80 space-y-6">
          <h3 className="text-lg font-bold text-white">Related Items in {product.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
