import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { ProductImage } from '../components/ProductImage.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import {
  Star,
  ShoppingCart,
  Zap,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Package,
  Plus,
  Minus,
  Info
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested product could not be located in our store catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const selectedPackage =
    product.packages && product.packages.length > 0
      ? product.packages[selectedPackageIndex]
      : null;

  const unitPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8">
        {/* Left Column: Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-80 w-full rounded-2xl" />

          {/* Quick Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-200">100% Genuine</p>
                <p className="text-[10px] text-slate-500">Official digital code</p>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-200">Fast Delivery</p>
                <p className="text-[10px] text-slate-500">WhatsApp / ID fulfillment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Package Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-cyan-400 uppercase">
                {product.platform || 'Digital'}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-purple-400 uppercase">
                {product.type || 'Code'}
              </span>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating || '5.0'} ({product.soldCount || 100}+ sold)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800 pt-5">
              <label className="block text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                Select Package / Denomination:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pack, idx) => {
                  const isSelected = selectedPackageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 text-slate-100 shadow-md shadow-cyan-950/30'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold line-clamp-1">
                        {pack.name}
                      </span>
                      <span className="block text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pack.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-5">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Quantity</span>
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 mt-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-cyan-400 font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-black text-slate-100">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-cyan-400 font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block">Total Price</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action Notification */}
          {addedMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              Item added to cart successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 rounded-xl text-xs font-extrabold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 disabled:opacity-50 shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
              Buy Now
            </button>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span>
              Instructions: Provide your Player ID in the order note at checkout for top-ups, or receive code directly after payment confirmation.
            </span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-6">
          <h3 className="text-xl font-extrabold text-slate-100">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
