import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Clock, RefreshCw, ChevronLeft } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products, onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-2xl font-black text-white uppercase mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The product you are looking for might have been removed or renamed.</p>
        <Link
          to="/products"
          className="bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product.packages && product.packages.length > 0 ? product.packages[0] : null;
  });

  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;

  // Pricing math
  const displayPrice = selectedPackage ? selectedPackage.price : product.price;
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Back link */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-900 p-2.5">
            <ProductImage product={product} className="rounded-2xl" />
          </div>

          {/* Core Info Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-900/40 border border-slate-900/60 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Platform</span>
              <span className="text-xs font-extrabold text-white uppercase block mt-1">{product.platform}</span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-900/60 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Type</span>
              <span className="text-xs font-extrabold text-white block mt-1">{product.type}</span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-900/60 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Rating</span>
              <span className="text-xs font-extrabold text-white block mt-1 flex items-center justify-center gap-1">
                ★ {product.rating}
              </span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-900/60 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Stock</span>
              <span
                className={`text-xs font-extrabold block mt-1 ${
                  isOutOfStock ? 'text-red-500' : 'text-emerald-400'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : `${product.stock} Units`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration & Pricing */}
        <div className="lg:col-span-5 bg-[#08080b] border border-slate-900 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff] bg-[#00e5ff]/10 px-2.5 py-1 rounded">
                Category: {product.category}
              </span>
              {product.tag && (
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#7000ff] px-2.5 py-1 rounded">
                  {product.tag}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{product.name}</h1>
            <p className="text-xs text-slate-400 font-semibold">
              Sold: <span className="text-slate-200">{product.soldCount} packages</span> to Kurdish gamers.
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-b border-slate-900/80 py-4">
            {product.description}
          </p>

          {/* Package / Bundle selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Select Package Choice
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00e5ff] bg-[#00e5ff]/5'
                          : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {pkg.name}
                        </span>
                      </div>
                      <span className="text-sm font-black text-[#00e5ff]">{formatPrice(pkg.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Quantity</h3>
            <div className="inline-flex items-center border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-extrabold text-sm"
              >
                -
              </button>
              <span className="px-6 text-sm font-black text-slate-100">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-extrabold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Price display & action buttons */}
          <div className="pt-6 border-t border-slate-900/60 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#00e5ff]">
                  {formatPrice(displayPrice * quantity)}
                </span>
                {discountPercent && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="bg-[#0066ff] hover:bg-[#0055dd] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy It Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust guarantees bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-950">
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-900/60">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">100% Genuine Guarantee</h4>
            <p className="text-[11px] text-slate-500 leading-normal mt-0.5">We source directly from licensed publishers & vendors.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-900/60">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Express Delivery</h4>
            <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Order manually via FastPay and get code delivered in 5-15 mins.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-900/60">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Refund Guarantee</h4>
            <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Full refund provided if any code or package is faulty.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
