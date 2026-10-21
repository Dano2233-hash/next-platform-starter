import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShieldCheck, ShoppingCart, ArrowRight, Zap, Check, ChevronLeft, Tag } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Package', price: product.price }];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);

  const isOutOfStock = product.stock === 0;
  const isSale = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = isSale ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, selectedPackage);
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, selectedPackage);
      navigate('/checkout');
    }
  };

  // Filter related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column - Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
            />
          </div>

          {/* Guarantee Info */}
          <div className="p-4 rounded-2xl bg-[#0a0f24] border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official & 100% Guaranteed Digital Item</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Purchased directly through official authorized distributors in Kurdistan & Iraq. Instant code activation.
            </p>
          </div>
        </div>

        {/* Right Column - Product Meta & Purchase Box */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold">
                {product.type}
              </span>
              {discountPercent > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-xs font-black">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span className="text-emerald-400 font-bold">
                {product.soldCount ? `${product.soldCount}+ Sold in Iraq` : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            {product.description}
          </div>

          {/* Select Package / Denomination */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Package / Amount *</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packages.map((pkg) => {
                const isSelected = selectedPackage.name === pkg.name;
                return (
                  <div
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-950/50 border-cyan-400 shadow-md shadow-cyan-950/40'
                        : 'bg-[#0a0f24] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{pkg.name}</span>
                      <span className="text-sm font-extrabold text-cyan-400">{formatPrice(pkg.price)}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-[#0c1229] border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block">Selected Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(selectedPackage.price)}
                </span>
                {isSale && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Delivery</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Instant Delivery
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Digital Products"
          subtitle="Other items popular in this category"
          products={relatedProducts}
        />
      )}

    </div>
  );
}
