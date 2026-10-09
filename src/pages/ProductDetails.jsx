import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Star, ShoppingCart, Zap, CheckCircle2, ShieldCheck, Clock, ArrowLeft, Gamepad2, Award } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl">
          Return to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Package', price: product.price }];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage.price * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Product Image & Highlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <ProductImage product={product} className="h-72 sm:h-96 w-full" />
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine Digital Code / Top-Up</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>Instant Digital Delivery in Kurdistan & Iraq</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Award className="w-4 h-4" />
              <span>Full Support via WhatsApp & Discord</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Package Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {isOutOfStock && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-red-950 text-red-400 border border-red-800">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{product.name}</h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '5.0'}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount ? `${product.soldCount.toLocaleString()} sold` : 'Instant Delivery'}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Stock: {product.stock} available</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            {product.description}
          </p>

          {/* Package Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider">
              Select Package / Amount *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackage.name === pkg.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100">{pkg.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-xs font-extrabold text-cyan-400 mt-1 block">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-300">Quantity:</span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-sm transition"
              >
                -
              </button>
              <span className="px-3 text-sm font-extrabold text-slate-100">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-sm transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#090e21] to-[#0d1533] border border-cyan-500/20 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400">Total Price</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(currentPrice)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
