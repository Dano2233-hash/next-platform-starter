import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Share2,
  Lock,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const [selectedPackage, setSelectedPackage] = useState(
    product.packages && product.packages.length > 0 ? product.packages[0] : { name: 'Standard', price: product.price }
  );
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 5);

  return (
    <div className="space-y-12 pb-16">
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Product Visual/Image Header */}
        <div className="lg:col-span-5 bg-[#080d1e] border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-80 object-cover rounded-2xl"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 text-xs font-black uppercase px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg">
                {product.tag}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">DELIVERY</span>
                <span className="text-white font-semibold">Instant Digital</span>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">REGION</span>
                <span className="text-white font-semibold">Kurdistan / Iraq</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Configuration & Buy Panel */}
        <div className="lg:col-span-7 bg-[#080d1e] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">

          {/* Title & Ratings */}
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <span>{product.platform}</span>
              <span>•</span>
              <span>{product.type}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 shrink-0 text-xs font-semibold flex items-center space-x-1"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-amber-400 font-extrabold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'}</span>
                <span className="text-slate-400 font-normal">({product.soldCount || 100}+ sold)</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className={product.stock > 0 ? "text-emerald-400 font-bold flex items-center space-x-1" : "text-red-400 font-bold"}>
                <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Package / Denomination:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-md shadow-cyan-500/10'
                          : 'border-slate-800 bg-[#0d1326] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold truncate">{pkg.name}</span>
                      <span className="block text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Display */}
          <div className="bg-[#0c1228] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Unit Price</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(selectedPackage ? selectedPackage.price : product.price)}
                </span>
                {product.oldPrice && product.oldPrice > (selectedPackage?.price || product.price) && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-xs flex items-center justify-center space-x-2 disabled:opacity-50 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:opacity-95 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Description Box */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Information</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Payment Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-200 block">Accepted Payment Methods:</span>
            <p>FastPay Mobile Wallet, Korek Telecom Balance Transfer, & MasterCard.</p>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Products"
          subtitle="You might also like these games & top-ups"
          badge="Recommendations"
          products={relatedProducts}
        />
      )}
    </div>
  );
}
