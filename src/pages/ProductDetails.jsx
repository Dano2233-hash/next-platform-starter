import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  Check,
  ShieldCheck,
  Clock,
  ArrowLeft,
  HelpCircle,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProducts();
  const { addToCart, buyNow } = useCart();

  const product = getProductBySlug(slug);

  // Fallback if not found
  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-heading">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  // Packages selection
  const packagesList = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'standard', name: 'Standard Edition', price: product.price, oldPrice: product.oldPrice }];

  const [selectedPackage, setSelectedPackage] = useState(packagesList[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const currentPrice = (selectedPackage.price || product.price) * quantity;
  const currentOldPrice = selectedPackage.oldPrice ? selectedPackage.oldPrice * quantity : 0;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    buyNow(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16 pt-4">

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
            <ProductImage
              product={product}
              heightClass="h-80 sm:h-96"
              aspectRatio="aspect-[16/11]"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-400 font-black text-sm uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#090d1e] border border-white/5 text-center">
            <div className="space-y-1">
              <Clock className="w-4 h-4 text-cyan-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">Instant Delivery</p>
              <p className="text-[10px] text-slate-500">2 to 15 minutes</p>
            </div>
            <div className="space-y-1 border-x border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">100% Genuine</p>
              <p className="text-[10px] text-slate-500">Official legal codes</p>
            </div>
            <div className="space-y-1">
              <Sparkles className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">Iraqi Dinar</p>
              <p className="text-[10px] text-slate-500">FastPay & Korek</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Options */}
        <div className="lg:col-span-6 space-y-6">

          {/* Metadata badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-wide">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.soldCount || 100}+ reviews)</span>
              </div>
              <span>•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="p-4 rounded-2xl bg-[#090d1e] border border-white/5 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Selected Total:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-cyan-400 font-heading">
                  {formatPrice(currentPrice)}
                </span>
                {currentOldPrice > 0 && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(currentOldPrice)}
                  </span>
                )}
              </div>
            </div>
            {currentOldPrice > currentPrice && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-600 text-white animate-pulse">
                SAVE {formatPrice(currentOldPrice - currentPrice)}
              </span>
            )}
          </div>

          {/* Package Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              1. Choose Package / Denomination:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packagesList.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-[#090d1e] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{pkg.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-cyan-400 font-heading">
                        {formatPrice(pkg.price)}
                      </span>
                      {pkg.oldPrice && pkg.oldPrice > pkg.price && (
                        <span className="text-[11px] text-slate-500 line-through">
                          {formatPrice(pkg.oldPrice)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-slate-300">Quantity:</span>
            <div className="flex items-center gap-3 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-400 hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-black text-white px-2 font-heading">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                className="text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  isOutOfStock
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-white/10 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isOutOfStock
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 shadow-cyan-500/25 hover:shadow-cyan-500/40'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now with FastPay / Korek</span>
              </button>
            </div>

            {addedToast && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-bold animate-in fade-in">
                Added {quantity}x {product.name} ({selectedPackage.name}) to cart!
              </div>
            )}
          </div>

          {/* Product Description */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* How to activate note */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 space-y-1">
            <p className="font-bold text-blue-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> How digital delivery works:
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Upon submitting your order, you can contact our Kurdish & Iraqi support team on WhatsApp with your Order ID to verify the payment receipt. Digital codes or top-ups will be released immediately.
            </p>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-white/5">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white font-heading">
              Related Products
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              You might also be interested in these digital items.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
