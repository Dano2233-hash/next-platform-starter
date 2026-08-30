import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products = [], onAddToCart, onOpenCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find(p => p.slug === slug || p.id === slug);

  // Selected package state (default to first package if available)
  const hasPackages = product?.packages && product.packages.length > 0;
  const [selectedPackage, setSelectedPackage] = useState(
    hasPackages ? product.packages[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync package selection if product changes
  React.useEffect(() => {
    if (product?.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Products</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isComingSoon = product.isComingSoon;

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const discountPercent = currentOldPrice && currentOldPrice > currentPrice
    ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) return;
    onAddToCart(product, selectedPackage, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || isComingSoon) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">

      {/* Back Button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Product Details Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Product Image / Visual Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <ProductImage product={product} className="h-80 w-full object-cover" />

              {/* Overlay Tags */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-blue-400 shadow">
                  {product.platform}
                </span>
                <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-cyan-400 shadow">
                  {product.type}
                </span>
              </div>

              {discountPercent && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 text-xs font-black rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow">
                    -{discountPercent}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-300">Instant Delivery</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-300">100% Official Key</span>
              </div>
            </div>
          </div>

          {/* Right: Options & Checkout Action */}
          <div className="lg:col-span-7 space-y-6">

            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-3 text-xs mb-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating} Rating</span>
                </div>
                <span className="text-slate-400 font-medium">
                  {product.soldCount ? `${product.soldCount.toLocaleString()} items sold` : 'Available'}
                </span>
                {isOutOfStock ? (
                  <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">Out of Stock</span>
                ) : (
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">In Stock ({product.stock})</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-snug">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Package Selection Grid */}
            {hasPackages && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Select Package Option:
                  </label>
                  <span className="text-[11px] text-cyan-400 font-semibold">
                    {product.packages.length} Packages Available
                  </span>
                </div>

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
                            ? 'bg-gradient-to-r from-blue-900/60 to-cyan-950/60 border-cyan-400 ring-2 ring-cyan-500/20 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="block font-bold text-xs">{pkg.name}</span>
                        <span className={`block text-xs mt-1 font-extrabold ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Total Price:</span>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
              </div>
              {currentOldPrice && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    Save {formatPrice((currentOldPrice - currentPrice) * quantity)}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {addedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Item added to your shopping cart!</span>
                  </div>
                  <button onClick={onOpenCart} className="underline text-white font-extrabold">
                    View Cart
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isComingSoon}
                  className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || isComingSoon}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Payment methods note */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Accepted Payment Methods:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800 font-bold">FastPay</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800 font-bold">Korek</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-800 font-bold">MasterCard</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
