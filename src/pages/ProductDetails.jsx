import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { Star, ShoppingCart, Zap, CheckCircle2, ShieldCheck, ArrowLeft, Share2, AlertCircle, Plus, Minus } from 'lucide-react';

export default function ProductDetails({ products, onAddToCart }) {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === idOrSlug || p.id === idOrSlug);

  const [selectedPkg, setSelectedPkg] = useState(
    product && product.packages && product.packages.length > 0 ? product.packages[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested product does not exist or has been removed.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const isOut = product.stock <= 0;
  const currentPrice = selectedPkg ? selectedPkg.price : product.price;
  const currentOldPrice = selectedPkg ? selectedPkg.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOut) return;
    onAddToCart(product, selectedPkg, quantity);
  };

  const handleBuyNow = () => {
    if (isOut) return;
    onAddToCart(product, selectedPkg, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090e1c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Left Column - Product Visual/Image */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-72 sm:h-80"
            />
          </div>

          <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Platform</span>
              <span className="text-xs font-extrabold text-cyan-400">{product.platform}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Type</span>
              <span className="text-xs font-extrabold text-purple-400">{product.type}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Stock Status</span>
              <span className={`text-xs font-extrabold ${isOut ? 'text-red-400' : 'text-emerald-400'}`}>
                {isOut ? 'Out of Stock' : `${product.stock} Available`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Product Info & Actions */}
        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          <div>
            {/* Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-950 text-blue-400 border border-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {product.category}
                </span>
                {product.tag && (
                  <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                    {product.tag}
                  </span>
                )}
              </div>
              <button
                onClick={handleShare}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <Share2 className="w-3.5 h-3.5" /> {copied ? 'Copied Link!' : 'Share'}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" /> {product.rating || '5.0'} Rating
              </div>
              <span>•</span>
              <span className="text-slate-300 font-medium">
                {product.soldCount ? `${product.soldCount.toLocaleString()} Orders Completed` : 'Popular Item'}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              {product.description}
            </p>

            {/* Package Selection */}
            {product.packages && product.packages.length > 0 && (
              <div className="mt-5 space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Package / Amount:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.packages.map((pkg, idx) => {
                    const isSelected = selectedPkg && selectedPkg.name === pkg.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-950/80 border-cyan-400 text-white shadow-md shadow-blue-500/10'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{pkg.name}</div>
                        <div className="text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center gap-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Actions */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                {formatPrice(currentPrice * quantity)}
              </span>
              {currentOldPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(currentOldPrice * quantity)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOut}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOut}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Genuine Product
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Digital Items"
          subtitle="More products in this category"
          products={relatedProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
