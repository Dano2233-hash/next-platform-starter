import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ShieldCheck, HelpCircle, ArrowLeft, RefreshCw, Send } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products, onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find target game/topup
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <span className="text-4xl block">📦</span>
        <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">Product Not Found</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
          The digital catalog you requested might have been removed, sold out, or updated by the store administrator.
        </p>
        <Link
          to="/products"
          className="bg-[#0066ff] hover:bg-[#0055dd] text-xs font-bold text-white px-5 py-2.5 rounded-lg inline-block transition-premium uppercase"
        >
          Browse Store Catalog
        </Link>
      </div>
    );
  }

  // Hook for packages/options configuration
  const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : 'Standard Edition';
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedPackage, quantity);
  };

  return (
    <div className="space-y-8">

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-premium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00e5ff]" />
          Back to browsing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left column - Visual card */}
        <div className="md:col-span-5 bg-[#090911] border border-[#121225] p-5 rounded-2xl space-y-4">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#1a1a2e] relative shadow-lg">
            <ProductImage product={product} className="w-full h-full object-cover" />
          </div>

          <div className="flex justify-between items-center text-xs font-bold bg-black/40 p-3 rounded-lg border border-[#121225]">
            <span className="text-gray-500">Platform Support</span>
            <span className="text-cyan-400 uppercase tracking-widest">{product.platform}</span>
          </div>

          <div className="flex justify-between items-center text-xs font-bold bg-black/40 p-3 rounded-lg border border-[#121225]">
            <span className="text-gray-500">Digital Type</span>
            <span className="text-purple-400 uppercase tracking-widest">{product.type}</span>
          </div>
        </div>

        {/* Right column - Pricing, package select and checkout trigger */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">

            {/* Rating row */}
            <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-white font-bold">{product.rating}</span>
              <span>•</span>
              <span>{product.soldCount}+ Successful Orders</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Package details */}
          <div className="bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#121225] pb-2">
              🎁 Choose Digital Package / Options
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.packages?.map((pkg) => {
                const isSelected = selectedPackage === pkg;
                return (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-lg text-left text-xs font-bold transition-premium border-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#0066ff] bg-[#0066ff]/5 text-white'
                        : 'border-[#121225] bg-black/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block truncate">{pkg}</span>
                  </button>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-4 border-t border-[#121225]/50">
              <span className="text-xs font-bold text-gray-400">Select Quantity</span>
              <div className="flex items-center gap-3 bg-black/40 border border-[#121225] rounded-lg px-3 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-gray-400 hover:text-[#00e5ff] text-base font-bold px-1"
                >
                  -
                </button>
                <span className="text-sm font-black text-white px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-gray-400 hover:text-[#00e5ff] text-base font-bold px-1"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Card Block */}
          <div className="bg-[#090911] border border-[#121225] p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-0.5">Estimated Cost</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#00e5ff]">
                  {formatPrice(product.price * quantity)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-purple-400 font-bold block mt-1">
                ⚡ {product.stock > 0 ? `${product.stock} keys in stock (Manual Delivery)` : 'Temporarily Out of Stock'}
              </span>
            </div>

            <div className="flex gap-2.5 w-full sm:w-auto shrink-0">
              {isOutOfStock ? (
                <button
                  disabled
                  className="w-full sm:w-auto bg-neutral-800 text-neutral-500 px-6 py-3 rounded-lg text-xs font-black uppercase cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-initial bg-[#0a0a16] hover:bg-[#12122a] text-xs font-black text-white px-6 py-3 rounded-lg border border-[#1a1a2e] transition-premium flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#00e5ff]" />
                    Add Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:glow-blue text-white text-xs font-black px-8 py-3 rounded-lg uppercase tracking-wider transition-premium flex items-center justify-center gap-1"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Store Rules / Guarantee Notice */}
          <div className="bg-[#05050c] border border-dashed border-[#1a1a2e] p-4 rounded-xl text-[11px] text-gray-500 space-y-2 leading-relaxed">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[10px]">📌 Activation Information</h4>
            <p>
              1. This is a digital purchase. All keys, accounts, or currency packages are delivered electronically.
            </p>
            <p>
              2. For Free-To-Play games (PUBG, Valorant, Free Fire), our prices reflect top-up bundles only; the game launcher itself is always free to download officially.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
