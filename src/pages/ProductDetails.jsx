import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowLeft,
  Minus,
  Plus,
  Gamepad2
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <Gamepad2 className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested game key or top-up item does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const [selectedPackage, setSelectedPackage] = useState(
    product.packages && product.packages.length > 0 ? product.packages[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const unitPrice = selectedPackage ? selectedPackage.price : product.price;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, selectedPackage, quantity);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, selectedPackage, quantity);
      navigate('/checkout');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-12">
      {/* Back button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Image Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-[16/11]">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-700 text-xs font-bold text-cyan-400 uppercase backdrop-blur-md">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-950/90 border border-indigo-700 text-xs font-bold text-indigo-300 uppercase backdrop-blur-md">
                {product.type}
              </span>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Dano Store 100% Security Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All codes, keys, and top-ups are officially sourced. Immediate manual processing upon payment receipt via FastPay, Korek, or FIB.
            </p>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'} Rating</span>
              </div>
              <span>&bull;</span>
              <span>{product.soldCount || 150}+ Sold in Iraq</span>
              <span>&bull;</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Packages Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Package / Denomination *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200 line-clamp-1">{pkg.name}</div>
                      <div className="text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Price Calculation */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Quantity
              </span>
              <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-extrabold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Total Price (IQD)</span>
              <div className="text-xl font-black text-cyan-400">
                {formatPrice(unitPrice * quantity)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-100 font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all disabled:opacity-40"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Toast Notification */}
            {addedToast && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Added to cart successfully!</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <h3 className="text-lg font-extrabold text-white">Similar Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.slug || p.id}`}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 block group transition-all"
              >
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2">
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    category={p.category}
                    platform={p.platform}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 line-clamp-1">
                  {p.name}
                </h4>
                <div className="text-xs font-extrabold text-cyan-400 mt-1">
                  {formatPrice(p.price)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
