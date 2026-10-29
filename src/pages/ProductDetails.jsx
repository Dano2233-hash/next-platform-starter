import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Back link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
      </Link>

      {/* Main Grid: Left Visual, Right Product Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Visual Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden p-2 shadow-2xl">
            <ProductImage product={product} className="!h-[320px] rounded-xl" />
          </div>

          {/* Guarantee Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> 100% Guaranteed Digital Product
            </div>
            <p className="text-slate-400 leading-relaxed">
              Safe & direct recharge to your Player ID / Account. Delivered securely within Kurdistan and Iraq.
            </p>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-2.5 py-1 text-xs font-extrabold uppercase rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-extrabold uppercase rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {product.type}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200">{product.rating || 5.0} Rating</span>
              </div>
              <span>•</span>
              <div>{product.soldCount || 100}+ Orders Completed</div>
              <span>•</span>
              <div className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            {product.description}
          </p>

          {/* Package Selection Options (if packages exist) */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> Choose Package / Denomination
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-900/50 via-slate-900 to-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400/30'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-100 truncate">{pkg.name}</span>
                      <span className="text-xs font-black text-cyan-400">{formatPrice(pkg.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity & Actions Box */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">

            {/* Price Display */}
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Total Unit Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-cyan-400">{formatPrice(currentPrice)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-slate-500 line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold mr-1">Qty:</span>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-slate-100">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Added Notice */}
            {addedNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Item added to cart successfully!</span>
                <button onClick={openCart} className="underline text-emerald-300">View Cart</button>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Related Products
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
