import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Tag
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to store
      </button>

      {/* Main Details Card */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">

        {/* Left Column: Image Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-72 sm:h-80 flex items-center justify-center">

            {/* Top Overlay Badges */}
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-slate-900/90 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
            </div>

            {product.tag && (
              <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-600 text-white shadow-md">
                {product.tag}
              </span>
            )}

            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authorized Game Voucher
            </span>
            <span className="text-slate-400 font-semibold">{product.soldCount || 100}+ Orders Delivered</span>
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">

          <div className="space-y-3">
            {/* Rating */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'} / 5.0 Rating</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-semibold uppercase">{product.category.replace('-', ' ')}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Select Package / Denomination:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950 to-cyan-950 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.02]'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{pkg.name}</div>
                      <div className="text-xs font-extrabold text-cyan-300 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Bar */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Price display */}
            <div>
              <span className="text-xs text-slate-400 block font-medium">Selected Amount</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-300">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">Qty:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-500/20 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 text-white'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              Buy Now
            </button>
          </div>

          {/* Toast feedback */}
          {addedToast && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" /> Item added to cart successfully!
            </div>
          )}

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
