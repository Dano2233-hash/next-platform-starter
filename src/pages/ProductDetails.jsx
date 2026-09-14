import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import { useCart } from '../hooks/useCart.jsx';
import ProductImage from '../components/ProductImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import {
  ShoppingCart,
  Zap,
  Star,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  Layers,
  ArrowLeft,
  Share2,
  Clock,
  Gamepad2
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <Gamepad2 className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The digital product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Store
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentUnitPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-slate-300 uppercase">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-300 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Image Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              aspectRatio="aspect-[4/3]"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Instant Code / Top-Up Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Digital License</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Package Selector, Pricing & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700 rounded-md">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-800 rounded-md">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 5.0} Rating</span>
              </div>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{product.soldCount || 100}+ Orders Fulfilled</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-cyan-400 font-semibold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Select Package Option:
                </span>
                <span className="text-xs text-cyan-400 font-semibold">
                  {selectedPackage ? selectedPackage.name : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white block mb-1 truncate">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-extrabold text-cyan-400 font-heading">
                        {formatPrice(pkg.price)}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Price Summary */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Quantity</span>
              <div className="flex items-center gap-3 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-3 border-t border-slate-800">
              <span className="text-xs font-medium text-slate-400">Total Price</span>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-heading tracking-wide">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700 hover:border-cyan-500/50'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2 text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied to Clipboard!' : 'Share Product'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800/80">
          <h2 className="text-xl font-bold font-heading text-white mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
