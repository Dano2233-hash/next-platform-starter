import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, Zap, ShieldCheck, Check, ArrowLeft, Plus, Minus, Layers } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotification, setAddedNotification] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;
  const isSale = currentOldPrice && currentOldPrice > currentPrice;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Image Container */}
        <div className="lg:col-span-5 bg-[#080d1a] border border-slate-800 rounded-3xl overflow-hidden p-3 shadow-2xl">
          <ProductImage product={product} className="h-72 sm:h-96 rounded-2xl" />

          <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs mt-2 border-t border-slate-800/80">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Delivery</span>
              <span className="font-bold text-cyan-400 text-xs">Instant / Fast</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Region</span>
              <span className="font-bold text-purple-400 text-xs">Kurdistan & Iraq</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Guarantee</span>
              <span className="font-bold text-emerald-400 text-xs">100% Legal</span>
            </div>
          </div>
        </div>

        {/* Right: Info & Controls */}
        <div className="lg:col-span-7 space-y-6">

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-2">
            {product.platform && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
            )}
            {product.tag && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {product.tag}
              </span>
            )}
            <div className="ml-auto flex items-center gap-1 text-amber-400 font-bold text-xs bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '4.9'}</span>
              <span className="text-slate-400 font-normal">({product.soldCount || 150}+ sold)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
            {product.name}
          </h1>

          {/* Dynamic Price Display */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#080d1a] to-slate-900 border border-slate-800 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-semibold mb-0.5">Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                {formatPrice(currentPrice * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-slate-400 ml-2">
                  ({formatPrice(currentPrice)} each)
                </span>
              )}
            </div>

            {isSale && (
              <div className="text-right">
                <span className="text-xs text-slate-500 line-through block">
                  {formatPrice(currentOldPrice * quantity)}
                </span>
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Save {Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-cyan-500 text-slate-100 ring-1 ring-cyan-500 shadow-lg'
                          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{pkg.name}</div>
                      <div className="text-xs font-mono font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Actions */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {addedNotification && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to cart successfully!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 border-slate-800 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-700 hover:border-slate-500 active:scale-95'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-cyan-500/20 active:scale-95'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Description & Features */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Product Details & Instructions
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {product.description}
            </p>
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Supported in Kurdistan & Iraq</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>FastPay & Korek Manual Payment</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-100">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
