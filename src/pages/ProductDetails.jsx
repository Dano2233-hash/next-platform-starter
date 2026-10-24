import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ChevronLeft,
  Flame,
  Minus,
  Plus
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, buyNow } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Default selected package
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading text-slate-200">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        >
          <ChevronLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    platform,
    type,
    description,
    packages = [],
    stock = 100,
    rating = 5.0,
    soldCount = 0,
    tag,
    isComingSoon = false
  } = product;

  const isOutOfStock = stock <= 0;
  const activePackage = packages[selectedPkgIndex] || packages[0] || { id: 'std', name: 'Standard', price: product.price };
  const currentPrice = activePackage.price;
  const currentOldPrice = activePackage.oldPrice || product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, activePackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || isComingSoon) return;
    buyNow(product, activePackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => (p.category === category || p.platform === platform) && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${category}`} className="capitalize hover:text-cyan-400 transition-colors">
          {category}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-bold truncate max-w-xs">{name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-80 sm:h-96 w-full rounded-3xl" />

          {/* Quick Features List */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <Zap size={18} className="text-cyan-400 shrink-0" />
              <span>Instant Digital Delivery via Player ID or Activation Code</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              <span>100% Genuine Digital License & Top-Up Security</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Buying Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {platform}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
                {type}
              </span>
              {tag && (
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  {tag}
                </span>
              )}
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-4xl text-slate-100">
              {name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} className="fill-amber-400 stroke-amber-400" />
                <span>{rating.toFixed(1)} / 5.0</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1 text-orange-400 font-semibold">
                <Flame size={14} /> {soldCount} Sold in Kurdistan
              </span>
              <span>•</span>
              <span className={`font-bold ${isOutOfStock ? 'text-red-400' : 'text-emerald-400'}`}>
                {isComingSoon ? 'Coming Soon' : isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
            {description}
          </p>

          {/* Package Selector */}
          {packages && packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Package Option:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={pkg.id || idx}
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-heading font-bold text-xs text-slate-100 truncate">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-black text-cyan-400 mt-1 font-heading">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Price Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-2xl text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && currentOldPrice > currentPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 text-sm font-bold text-slate-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isComingSoon}
                className="py-3.5 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isComingSoon}
                className="py-3.5 px-4 rounded-xl font-heading font-extrabold text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <ShoppingBag size={18} />
                <span>Buy Now ({formatPrice(currentPrice * quantity)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800 space-y-4">
          <h3 className="font-heading font-black text-xl text-slate-100">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
