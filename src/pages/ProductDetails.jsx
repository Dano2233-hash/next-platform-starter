import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  Zap,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronRight,
  PackageCheck
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-sm text-slate-400">The game or product you are looking for does not exist.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages || [{ name: 'Standard Package', price: product.price }];
  const currentPkg = packages[selectedPkgIndex] || packages[0];
  const isAvailable = product.stock !== false;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(product, currentPkg, quantity);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addToCart(product, currentPkg, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-cyan-400">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-bold truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1021] border border-[#1a223e] rounded-3xl overflow-hidden p-3 shadow-xl">
            <ProductImage product={product} className="h-72 sm:h-96 w-full rounded-2xl" />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#0c1021] border border-[#1a223e] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-slate-200">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Official license code</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0c1021] border border-[#1a223e] flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-slate-200">Instant Delivery</span>
                <span className="text-[10px] text-slate-400">Kurdistan fast dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Package Selector & Buying Box */}
        <div className="lg:col-span-7 bg-[#0c1021] border border-[#1a223e] rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {product.platform || 'PC'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {product.type || 'Game'}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 5.0} Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Orders Completed</span>
              <span>•</span>
              <span className={isAvailable ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package Selection */}
          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Select Package / Quantity</span>
              <span className="text-xs font-medium text-cyan-400">{packages.length} Options</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPkgIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPkgIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-slate-100">{pkg.name}</span>
                      <span className="text-sm font-black text-cyan-400 mt-0.5 block">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                    {isSelected && <PackageCheck className="w-5 h-5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Price Bar & Actions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Selected Price</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(currentPkg.price * quantity)}
                </span>
              </div>

              {/* Quantity adjust */}
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-400 hover:text-white px-2 py-0.5 font-bold"
                >
                  -
                </button>
                <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-400 hover:text-white px-2 py-0.5 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
