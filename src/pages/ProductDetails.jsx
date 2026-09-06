import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  Info
} from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => (p.slug === slug || p.id === slug));

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard Edition', price: product.price });
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto my-12 bg-[#090e1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <span className="text-xs text-slate-500 font-medium capitalize">
          {product.category} / {product.platform}
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">

        {/* Left Visual Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <ProductImage
              image={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="h-72 sm:h-80"
            />
          </div>

          {/* Badges Bar */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="px-3 py-1 bg-slate-900 text-cyan-400 border border-slate-800 font-bold uppercase rounded-lg">
              {product.platform}
            </span>
            <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800/60 font-bold uppercase rounded-lg">
              {product.type || 'Digital Item'}
            </span>
            {product.tag && (
              <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800/60 font-bold rounded-lg">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Right Product Details & Action Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Ratings and Sales Stats */}
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'} / 5.0 Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300">
                {product.soldCount ? `${product.soldCount.toLocaleString()} units sold` : 'High Demand'}
              </span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock & Ready'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0c1220] p-4 rounded-2xl border border-slate-800/80">
            {product.description}
          </p>

          {/* Package Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4" />
                <span>Select Package / Recharge Amount</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-cyan-500 ring-1 ring-cyan-500/50'
                          : 'bg-[#0c1220] border-slate-800 hover:border-slate-700 hover:bg-[#0f172a]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{pkg.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-xs font-black text-cyan-300 mt-1">
                        {formatPrice(pkg.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Quantity Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Item Price:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">Quantity:</span>
              <div className="flex items-center bg-[#0c1220] border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 font-black text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/40 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Toast Notification */}
          {addedToast && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-800 text-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Item successfully added to cart!</span>
            </div>
          )}

          {/* Guarantee Footer Banner */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-[11px] text-slate-400 font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>FastPay, Korek & MasterCard</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Direct WhatsApp Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
