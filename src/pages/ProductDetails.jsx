import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShoppingCart, Zap, CheckCircle, ShieldCheck, ArrowLeft, Package, Sparkles } from 'lucide-react';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs">
          Back to Store
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    platform,
    type,
    price,
    oldPrice,
    description,
    image,
    packages = [],
    stock = 0,
    rating = 5.0,
    soldCount = 0,
    tag,
  } = product;

  // Selected package state
  const initialPackage = packages.length > 0 ? packages[0] : { name: 'Standard Edition', price: price };
  const [selectedPkg, setSelectedPkg] = useState(initialPackage);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = stock <= 0;
  const currentPrice = selectedPkg.price || price;
  const hasDiscount = oldPrice && oldPrice > currentPrice;

  const handleAddToCart = () => {
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product, selectedPkg, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock && onBuyNow) {
      onBuyNow(product, selectedPkg, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="py-6 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Product Visual Image Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-[16/11] relative">
            <ProductImage
              src={image}
              name={name}
              category={category}
              platform={platform}
              className="w-full h-full object-cover"
            />
            {tag && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow">
                {tag}
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Code Delivery</span>
            </div>
            <span className="text-cyan-400 font-bold">100% Genuine</span>
          </div>
        </div>

        {/* Right Column: Title, Packages, Pricing & Purchase Form */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800/80">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {platform}
              </span>
              <span className="bg-purple-950/80 text-purple-300 border border-purple-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{name}</h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{soldCount.toLocaleString()} Orders Completed</span>
              <span>•</span>
              <span className={stock > 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                {stock > 0 ? `${stock} In Stock` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-3">
            {description}
          </p>

          {/* Package Selection Options */}
          {packages && packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package / Amount</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkg.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3 rounded-xl border text-left transition duration-200 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 text-slate-100 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold line-clamp-1">{pkg.name}</p>
                      <p className="text-xs font-extrabold text-cyan-400 mt-1">{formatPrice(pkg.price)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Price Row */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Selected Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-300">{formatPrice(currentPrice * quantity)}</span>
                  {hasDiscount && (
                    <span className="text-xs text-slate-400 line-through">{formatPrice(oldPrice * quantity)}</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl font-extrabold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
