import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import {
  Star,
  CheckCircle,
  ShieldCheck,
  Zap,
  ShoppingCart,
  ArrowLeft,
  Share2,
  PackageCheck,
  AlertTriangle,
  Minus,
  Plus
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Selected package option
  const initialPackage = product?.packages && product.packages.length > 0 ? product.packages[0] : null;
  const [selectedPkg, setSelectedPkg] = useState(initialPackage);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Update selected package if product changes
  React.useEffect(() => {
    if (product?.packages && product.packages.length > 0) {
      setSelectedPkg(product.packages[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The requested digital item could not be located.</p>
        <Link to="/products" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">
          Return to Store
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPkg ? selectedPkg.price : product.price;
  const currentOldPrice = selectedPkg?.oldPrice || product.oldPrice;
  const hasDiscount = currentOldPrice && currentOldPrice > currentPrice;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity, true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to catalog</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#070b14] shadow-xl">
            <ProductImage
              src={product.image}
              name={product.name}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 w-full"
            />
          </div>

          {/* Guarantee highlights */}
          <div className="p-4 rounded-xl bg-[#0b101e] border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Delivery via WhatsApp / In-game ID</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine and official publisher license</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <PackageCheck className="w-4 h-4 text-blue-400" />
              <span>Manual payment confirmed within minutes (FastPay, Korek, MasterCard)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badges & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-slate-300">
                {product.type}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-slate-300">
                {product.category.replace('-', ' ')}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600/60 text-blue-200">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Sold */}
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'} / 5.0</span>
              </div>
              <span>•</span>
              <span>{product.soldCount?.toLocaleString() || '1,200+'} orders fulfilled</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#0b101e] border border-slate-800/90 rounded-2xl p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">
                {formatPrice(currentPrice * quantity)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(currentOldPrice * quantity)}
                </span>
              )}
              {quantity > 1 && (
                <span className="text-xs text-slate-400">
                  ({formatPrice(currentPrice)} each)
                </span>
              )}
            </div>

            {/* Packages / Options Selection */}
            {product.packages && product.packages.length > 0 && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Select Package / Edition:</span>
                  <span className="text-cyan-400">{selectedPkg?.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPkg?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkg(pkg)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-white truncate mb-1">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-extrabold text-cyan-400">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-40"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs transition shadow-[0_0_20px_rgba(0,102,255,0.4)] disabled:opacity-40"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Description & Activation Guide */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Overview</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0b101e] p-4 rounded-xl border border-slate-800">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800/80">
          <h3 className="text-lg font-bold text-white mb-4">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
