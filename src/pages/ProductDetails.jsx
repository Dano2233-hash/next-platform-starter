import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Check,
  Package,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.slug === slug || p.id === slug
  );

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100 font-heading">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product or package you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Store Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPkgIndex] || packages[0];
  const unitPrice = currentPackage.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, currentPackage, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Visual Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage
            src={product.image}
            alt={product.name}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="h-80 sm:h-96"
          />

          {/* Key Guarantees Box */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
              Dano Store Guarantee
            </h4>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Genuine and official digital key/service.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Fast direct processing within minutes after payment.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Dedicated WhatsApp and Discord support for Iraq & Kurdistan.</span>
            </div>
          </div>
        </div>

        {/* Right Product Selection & Details */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header Info */}
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'} Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-medium">{product.soldCount || 100}+ Orders Completed</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">In Stock ({product.stock} available)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Select Package */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Select Package / Denomination ({packages.length} Options)</span>
              <span className="text-cyan-400 font-normal">Fast Delivery</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPkgIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPkgIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 text-slate-100 shadow-md shadow-cyan-950/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs line-clamp-1">{pkg.name}</div>
                    <div className="text-xs font-extrabold text-cyan-400 mt-1">
                      {formatPrice(pkg.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Price Summary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-slate-100 font-bold text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Total Price</span>
              <span className="text-xl font-extrabold text-cyan-400 tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Buy Now
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
