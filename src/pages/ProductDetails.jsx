import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShoppingCart, Zap, Check, ArrowLeft, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product?.packages?.[0] || null;
  });
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or was removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const currentPackage = selectedPackage || product.packages?.[0] || { id: 'std', name: 'Standard', price: product.price };
  const unitPrice = currentPackage.price !== undefined ? currentPackage.price : product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, currentPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product, currentPackage, quantity);
    } else {
      onAddToCart(product, currentPackage, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-[#0b101c] p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="rounded-xl overflow-hidden h-72 sm:h-80 w-full relative">
            <ProductImage product={product} className="h-full w-full" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-slate-200">Instant Delivery</p>
                <p className="text-[11px] text-slate-500">Auto-sent or 5 min process</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-slate-200">100% Guaranteed</p>
                <p className="text-[11px] text-slate-500">Official digital keys</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0b101c] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase">
                {product.type}
              </span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating || '5.0'}</span>
              <span className="text-slate-500 ml-1">({product.soldCount || 100}+ sold)</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = currentPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-md shadow-cyan-950/40'
                          : 'bg-[#080d17] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold line-clamp-1">{pkg.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />}
                      </div>
                      <p className="text-xs font-bold text-cyan-400">{formatPrice(pkg.price)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-y border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase">Quantity</span>
            <div className="flex items-center gap-3 bg-[#080d17] border border-slate-800 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-slate-900 text-slate-300 font-extrabold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="text-sm font-bold text-white px-2">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-slate-900 text-slate-300 font-extrabold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Price (IQD)</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs transition-colors border border-slate-700 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-950/60 disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
