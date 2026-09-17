import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Info,
  Package,
  Plus,
  Minus
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black font-extrabold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const currentPrice = currentPackage.price;
  const totalPrice = currentPrice * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Product Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Media Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d18] border border-slate-800 rounded-3xl overflow-hidden p-2 shadow-xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full aspect-[4/3] rounded-2xl"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Digital Code / ID Top-Up Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified 100% Genuine product code &amp; service</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Info className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Manual payment verification in Kurdistan / Iraq</span>
            </div>
          </div>
        </div>

        {/* Right Info & Purchasing Box */}
        <div className="lg:col-span-7 space-y-6 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 md:p-8">

          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
                  {product.platform}
                </span>
                <span className="bg-purple-950 text-purple-400 border border-purple-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                  {product.type}
                </span>
                {product.tag && (
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-black text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                    {product.tag}
                  </span>
                )}
              </div>

              <button
                onClick={handleCopyLink}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white font-sans">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount} Orders Completed</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Description</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Package Selection */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option</span>
              </label>
              <span className="text-[11px] text-slate-500">{packages.length} option(s) available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0e1933] border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-[#090d18] hover:bg-slate-800/60 border-slate-800'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {pkg.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{formatPrice(pkg.price)}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity</span>
            <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xl overflow-hidden text-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-black text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Price Box & CTA Buttons */}
          <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-500 block">Total Price</span>
                <span className="text-2xl font-black text-cyan-300">{formatPrice(totalPrice)}</span>
              </div>
              {product.oldPrice && product.oldPrice > currentPrice && (
                <div className="text-right">
                  <span className="text-xs text-slate-500 line-through block">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold">
                    Save {formatPrice((product.oldPrice - currentPrice) * quantity)}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 disabled:opacity-50 text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800/80 space-y-4">
          <h3 className="text-xl font-black text-white font-sans">Similar Products You Might Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
