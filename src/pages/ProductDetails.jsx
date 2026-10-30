import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  Check,
  ArrowLeft,
  Share2,
  PackageCheck,
  Sparkles,
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setSelectedPkgIndex(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Product Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">The requested item does not exist or has been removed.</p>
          <Link
            to="/products"
            className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const packages = product.packages?.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const activePackage = packages[selectedPkgIndex] || packages[0];
  const unitPrice = activePackage.price || product.price;
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    navigate('/cart');
  };

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative">
      <Navbar />

      {/* Added Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/50 p-4 rounded-xl shadow-2xl shadow-cyan-500/20 flex items-center gap-3 text-xs font-bold text-slate-100 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <div>
            <p className="text-cyan-400 font-extrabold">Added to Cart!</p>
            <p className="text-slate-400 text-[11px] font-normal">{product.name} ({activePackage.name}) x{quantity}</p>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 space-y-10">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
            {product.platform} / {product.type}
          </span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Image Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 shadow-xl">
              <ProductImage
                src={product.image}
                alt={product.name}
                category={product.category}
                platform={product.platform}
                className="h-80 sm:h-96 rounded-xl"
              />
            </div>

            {/* Legal / Protection Box */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">100% Legal & Guaranteed</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Direct digital delivery in Kurdistan & Iraq. Supported by official authorization.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Package Selector */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-900 text-cyan-400 border border-slate-700">
                  {product.platform}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  {product.type}
                </span>
                {product.tag && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {product.tag}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {product.rating || '5.0'} Rating
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">{product.soldCount || 0} Orders Sold</span>
                <span>•</span>
                <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isOutOfStock ? 'Out of Stock' : `${product.stock} In Stock`}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#080c19] border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Package Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package / Option
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-100 truncate">
                        {pkg.name}
                      </span>
                      <span className="block text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div>
                <span className="block text-xs font-bold text-slate-200">Quantity</span>
                <span className="block text-[11px] text-slate-400">Select number of units</span>
              </div>

              <div className="flex items-center gap-3 bg-slate-950 border border-slate-700 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-extrabold text-slate-100 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Total & CTA Buttons */}
            <div className="p-5 bg-gradient-to-r from-[#0d1322] to-[#080d19] border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Price:</span>
                <span className="text-2xl font-black text-cyan-400 tracking-tight">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="pt-10 border-t border-slate-800">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Similar Digital Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
