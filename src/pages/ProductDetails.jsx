import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug || p.id === slug);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'std', name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity, true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-72 sm:h-96 w-full"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-sm uppercase tracking-wider">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Instant Delivery</div>
                <div className="text-[10px] text-slate-400">Via WhatsApp verification</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">100% Genuine</div>
                <div className="text-[10px] text-slate-400">Direct license guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Options */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            {/* Platform & Type Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold uppercase rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-blue-950/80 text-blue-300 border border-blue-800/60">
                  {product.tag}
                </span>
              )}
              <button
                onClick={handleShare}
                className="ml-auto p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{Number(product.rating || 5.0).toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Satisfied Customers</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">In Stock: {product.stock} units</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            {product.description}
          </div>

          {/* Package Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Package / Option ({packages.length} Available)
              </label>
              <span className="text-xs text-cyan-400 font-medium">Delivered instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <button
                    key={pkg.id || idx}
                    type="button"
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-md shadow-cyan-950/40'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">{pkg.name}</div>
                      <div className="text-[11px] text-slate-400">Immediate Digital Delivery</div>
                    </div>
                    <div className="text-sm font-extrabold text-cyan-400 ml-3">
                      {formatPrice(pkg.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Price Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Price ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {formatPrice(currentPackage.price * quantity)}
                </div>
              </div>

              {/* Quantity incrementor */}
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-slate-300 hover:text-white hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-sm font-extrabold text-white min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-slate-300 hover:text-white hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className={`py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-950/60 active:scale-95 cursor-pointer'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                Buy Now
              </button>

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-cyan-500/50 text-white active:scale-95 cursor-pointer'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-800">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
              Similar Recommendations
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Customers Also Bought</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
