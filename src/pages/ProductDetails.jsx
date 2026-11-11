import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Zap,
  Check,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  Share2,
  Layers,
  MessageCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = useProducts().products.find(
    (p) => p.slug === slug || p.id === slug
  );

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // If product not found
  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const activePackage = packages[selectedPackageIndex] || packages[0];
  const activePrice = activePackage.price;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-cyan-400">Products</Link>
        <span>/</span>
        <span className="text-slate-200 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-cyan-400 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Visual Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/80">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              containerClassName="h-72 sm:h-96 w-full"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Instant Digital Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>100% Genuine & Safe</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-600/80 text-white">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'}</span>
                <span className="text-slate-400 font-normal">({product.soldCount || 100}+ sold)</span>
              </div>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                {product.stock > 0 ? `In Stock (${product.stock} codes remaining)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/30 to-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatPrice(activePrice * quantity)}
                </span>
                {product.oldPrice > activePrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>

          {/* Package Selection */}
          {packages.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">Select Package / Edition</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPackageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-500 ring-2 ring-cyan-500/30'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {pkg.name}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400 mt-2 block">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">Quantity:</span>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 disabled:opacity-50 transition-all"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description & Specs */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white">Product Description</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
              <div>Region: <strong className="text-slate-200">Global / Kurdistan / Iraq</strong></div>
              <div>Platform: <strong className="text-slate-200">{product.platform}</strong></div>
              <div>Type: <strong className="text-slate-200">{product.type}</strong></div>
            </div>
          </div>

          {/* WhatsApp Direct Help */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
            <span className="text-slate-300">Need instant activation help or custom quantity?</span>
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Related Products You May Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default ProductDetails;
