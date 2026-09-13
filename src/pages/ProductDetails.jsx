import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Layers,
  ChevronRight,
  AlertCircle,
  Check,
  UserCheck
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [accountDetails, setAccountDetails] = useState('');

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 bg-[#090e1a] border border-slate-800 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && Number(product.stock) <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const packages = product.packages && product.packages.length > 0 ? product.packages : [{ name: 'Standard', price: product.price }];

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage || packages[0], quantity, accountDetails);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage || packages[0], quantity, accountDetails);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-cyan-400">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Image Visual Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl relative">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#090e1a] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 100% Guaranteed Official Digital Delivery
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All codes and top-ups purchased on Dano Store are sourced directly from authorized regional distributors. Instant code processing upon payment confirmation.
            </p>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-extrabold uppercase rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">{product.soldCount || 100}+ Sold</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-semibold'}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock || 100})`}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            {product.description}
          </p>

          {/* Package Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" /> Select Package / Amount Option:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackage ? selectedPackage.name === pkg.name : idx === 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100">{pkg.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                    <span className="text-xs font-extrabold text-cyan-400 mt-1 block">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Details / Player ID Input if needed */}
          {(product.category === 'mobile' || product.type === 'Top-Up') && (
            <div className="space-y-2 bg-[#090e1a] p-4 rounded-xl border border-slate-800">
              <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-cyan-400" /> Player ID / User Account Details
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder="Enter your Player ID (e.g. 512345678)"
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <p className="text-[11px] text-slate-500">
                Your Player ID will be used for direct top-up delivery.
              </p>
            </div>
          )}

          {/* Pricing & Quantity Action Row */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase block font-semibold">Total Unit Price</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                >
                  -
                </button>
                <span className="text-xs font-bold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-slate-400" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                }`}
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
};
