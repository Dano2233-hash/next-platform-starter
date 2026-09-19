import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Flame,
  ShieldCheck,
  Zap,
  ShoppingCart,
  CheckCircle2,
  ArrowLeft,
  Share2,
  PackageCheck,
  AlertCircle
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
  const { addToCart, openCart } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

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
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-cyan-500 text-black"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  // Determine current price based on selected package
  const currentUnitPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage
    ? selectedPackage.oldPrice
    : product.oldPrice;

  const totalItemPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    openCart();
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-3 overflow-hidden shadow-2xl">
            <ProductImage product={product} heightClass="h-80 sm:h-96" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-[#0a0e1a] border border-slate-800 rounded-2xl">
              <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="font-bold text-slate-200 block">Instant</span>
              <span className="text-[10px] text-slate-500">Auto / Fast Top-up</span>
            </div>
            <div className="p-3 bg-[#0a0e1a] border border-slate-800 rounded-2xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="font-bold text-slate-200 block">100% Safe</span>
              <span className="text-[10px] text-slate-500">Official Licenses</span>
            </div>
            <div className="p-3 bg-[#0a0e1a] border border-slate-800 rounded-2xl">
              <PackageCheck className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="font-bold text-slate-200 block">Local Payments</span>
              <span className="text-[10px] text-slate-500">FastPay & Korek</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Package Selector, Pricing & Purchase CTA */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Badges & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 rounded-lg uppercase">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold text-purple-300 bg-purple-950 border border-purple-800 rounded-lg uppercase">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 text-xs font-extrabold text-amber-300 bg-amber-950 border border-amber-800 rounded-lg">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating and Sold */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'} Rating</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 font-semibold text-slate-300">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>{product.soldCount || 0}+ Completed Orders</span>
              </div>
              <span className="text-slate-600">•</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Package Selection Options */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Select Package / Amount:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-[#0a0e1a] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-slate-100 block">
                        {pkg.name}
                      </span>
                      <span className="text-xs font-bold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quantity:
            </span>
            <div className="flex items-center border border-slate-800 rounded-xl bg-[#0a0e1a] overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 text-sm font-bold"
              >
                -
              </button>
              <span className="px-4 text-xs font-extrabold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 text-sm font-bold"
              >
                +
              </button>
            </div>

            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Only {product.stock} in stock
              </span>
            )}
          </div>

          {/* Price Summary & Purchase Actions */}
          <div className="bg-[#0a0e1a] border border-slate-800/90 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {formatPrice(totalItemPrice)}
                </span>
                {currentOldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 text-xs font-extrabold rounded-2xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 text-xs font-black rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/20 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Description & Delivery Info
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed bg-[#0a0e1a] p-4 rounded-2xl border border-slate-800/80">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <h2 className="text-lg font-black text-white">Related Items You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
