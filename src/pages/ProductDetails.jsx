import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Zap,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Share2,
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
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages || [{ name: 'Standard Package', price: product.price, oldPrice: product.oldPrice }];
  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Back Link */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Product Image Column */}
        <div className="lg:col-span-5 bg-[#090d1a] border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ProductImage
              src={product.image}
              alt={product.name}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-72 sm:h-96"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Digital License</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Product Info & Package Selector Column */}
        <div className="lg:col-span-7 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2">
            {product.platform && (
              <span className="bg-slate-900 text-cyan-400 border border-cyan-500/30 text-xs font-extrabold uppercase px-3 py-1 rounded-lg">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="bg-slate-900 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase px-3 py-1 rounded-lg">
                {product.type}
              </span>
            )}
            {product.tag && (
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase px-3 py-1 rounded-lg">
                {product.tag}
              </span>
            )}
          </div>

          {/* Title & Short Description */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 py-3 border-y border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating || '4.9'} / 5.0 Rating</span>
            </div>
            <div className="text-slate-400">
              <span className="font-bold text-white">{product.soldCount || '1000'}+</span> Orders Delivered
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Instant Digital Delivery</span>
            </div>
          </div>

          {/* Package Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              Select Package Tier ({packages.length} Available)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pack, index) => {
                const isSelected = selectedPackageIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedPackageIndex(index)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-3 right-3" />
                    )}
                    <p className="text-xs font-bold text-slate-100">{pack.name}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-cyan-400">
                        {formatPrice(pack.price)}
                      </span>
                      {pack.oldPrice && pack.oldPrice > pack.price && (
                        <span className="text-[11px] text-slate-500 line-through">
                          {formatPrice(pack.oldPrice)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Stock Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Total Price:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {formatPrice(currentPackage.price * quantity)}
                </span>
                {currentPackage.oldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(currentPackage.oldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Qty:</span>
              <div className="flex items-center border border-slate-800 bg-slate-900 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-500/20 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-white'
              }`}
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 space-y-6">
          <h2 className="text-xl font-extrabold text-white">Similar Related Items</h2>
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
