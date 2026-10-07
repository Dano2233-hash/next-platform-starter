import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug } = useProducts();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Back link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left Image Visual */}
        <div className="space-y-4">
          <ProductImage product={product} className="h-80 sm:h-96" />

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Digital Delivery Guarantee</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Order codes or player ID top-ups are processed rapidly upon order verification. Support available via WhatsApp &amp; Discord.
            </p>
          </div>
        </div>

        {/* Right Product Options */}
        <div className="space-y-6">

          {/* Header Badges & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              {product.name}
            </h1>

            {/* Rating & Sold */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 0} Total Orders</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            {product.description}
          </div>

          {/* Packages Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Select Package Option:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;

                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-lg shadow-purple-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{pkg.name}</div>
                      <div className="text-xs font-semibold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Price:</span>
            <div className="flex items-baseline gap-3">
              {currentOldPrice && currentOldPrice > currentPrice && (
                <span className="text-xs text-slate-500 line-through font-semibold">
                  {formatPrice(currentOldPrice * quantity)}
                </span>
              )}
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(currentPrice * quantity)}
              </span>
            </div>
          </div>

          {/* Quantity picker & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantity:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || product.isComingSoon}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || product.isComingSoon}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* How to receive item info */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>How to Receive Your Product</span>
            </h4>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Complete checkout using FastPay, Korek, or MasterCard.</li>
              <li>You will receive an official Order Number (e.g. DS-849201).</li>
              <li>Send us your order number via WhatsApp or Discord for immediate key activation / ID top-up.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
