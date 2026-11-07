import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Check,
  Clock,
  Sparkles,
  HelpCircle,
  Package
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProducts();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  if (!product) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: `${product.id}-std`, name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const unitPrice = currentPackage.price;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    setToastMessage(`Added ${quantity}x "${product.name} (${currentPackage.name})" to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back link */}
      <div className="pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-8">
        {/* Left Column: Visual / Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-72 sm:h-80"
            />
          </div>

          {/* Quick Security & Guarantee badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#05070f] border border-slate-800 text-xs">
              <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">100% Genuine</span>
                <span className="text-slate-400 text-[11px]">Authorized region codes</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#05070f] border border-slate-800 text-xs">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">Fast Delivery</span>
                <span className="text-slate-400 text-[11px]">Via WhatsApp / Chat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Packages & Purchase */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Platform & Tag badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-950/80 text-purple-400 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Sold metrics */}
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm text-white">{product.rating}</span>
                <span className="text-slate-400">Rating</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="text-slate-300">
                <strong className="text-white">{product.soldCount}</strong> orders completed
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-cyan-400">
                <Clock className="w-3.5 h-3.5" /> 5-15 mins delivery
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              {product.description}
            </p>

            {/* Package / Denomination Selection */}
            {packages.length > 0 && (
              <div className="space-y-2.5 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-cyan-400" /> Select Package / Denomination:
                  </span>
                  <span className="text-slate-400 font-medium">
                    {packages.length} option{packages.length > 1 ? 's' : ''} available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packages.map((pkg, idx) => {
                    const isSelected = selectedPackageIndex === idx;
                    return (
                      <button
                        key={pkg.id || idx}
                        type="button"
                        onClick={() => setSelectedPackageIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400 text-white shadow-md shadow-cyan-500/20'
                            : 'bg-[#05070f] border-slate-700/80 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <span className="font-bold text-xs line-clamp-1">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-black text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pricing, Quantity & Checkout Bar */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Total Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-cyan-400">
                    {formatPrice(unitPrice * quantity)}
                  </span>
                  {product.oldPrice && product.oldPrice > unitPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.oldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">Qty:</span>
                <div className="flex items-center border border-slate-700 rounded-xl bg-[#05070f] overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-colors ${
                  isOutOfStock
                    ? 'bg-slate-800/40 text-slate-500 border-slate-700/40 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold shadow-lg transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-white shadow-cyan-500/25'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isOutOfStock ? 'Sold Out' : 'Buy Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions & FAQs box */}
      <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>How It Works & Delivery Guide</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5 p-4 rounded-xl bg-[#05070f] border border-slate-800/80">
            <span className="font-extrabold text-cyan-400 text-sm">1. Choose Package & Place Order</span>
            <p className="text-slate-400 leading-relaxed">
              Select your desired top-up package or game edition and proceed to checkout with your name, phone number, and city.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-[#05070f] border border-slate-800/80">
            <span className="font-extrabold text-cyan-400 text-sm">2. Manual Payment Transfer</span>
            <p className="text-slate-400 leading-relaxed">
              Send the exact IQD amount via FastPay, Korek Telecom, or MasterCard using our verified accounts.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-[#05070f] border border-slate-800/80">
            <span className="font-extrabold text-cyan-400 text-sm">3. Instant Code / Top-Up</span>
            <p className="text-slate-400 leading-relaxed">
              Send your order receipt or screenshot to our WhatsApp or Discord team for immediate validation and digital dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Related Games & Services
          </h3>
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

export default ProductDetails;
