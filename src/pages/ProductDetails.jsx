import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, ShoppingCart, Zap, Check, ArrowLeft, ShieldCheck,
  Clock, Share2, AlertCircle, Package
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard', price: product.price });
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-xl"
        >
          Back to Store Catalog
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentUnitPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Visual Image Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden p-2 shadow-2xl relative">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-72 sm:h-80 object-cover rounded-xl"
            />

            {/* Platform & Type badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-950/90 text-cyan-400 border border-cyan-500/40 rounded-lg backdrop-blur-sm uppercase">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-950/90 text-slate-200 border border-slate-700 rounded-lg backdrop-blur-sm uppercase">
                {product.type}
              </span>
            </div>
          </div>

          {/* Guarantee Badges Box */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="font-bold block">100% Guaranteed</span>
                <span className="text-[10px] text-slate-400">Official Distributor</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="font-bold block">Instant Delivery</span>
                <span className="text-[10px] text-slate-400">Direct Code Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded-md">
                {product.tag || 'Instant Key'}
              </span>

              <button
                onClick={handleShare}
                className="p-2 bg-[#090d1a] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedShare ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                {product.rating || 4.9}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{product.soldCount || 500}+ Orders Completed</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#090d1a] border border-slate-800/80 rounded-2xl p-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage && selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border-cyan-400 ring-1 ring-cyan-500/50 shadow-md'
                          : 'bg-[#090d1a] border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-100 block">{pkg.name}</span>
                        <span className="text-xs font-black text-cyan-400 mt-0.5 block">{formatPrice(pkg.price)}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Price Box */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Total Price</span>
                <span className="text-2xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center bg-[#05070f] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-extrabold text-sm text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center transition-colors"
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
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now with FastPay / Korek</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Related Store Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
