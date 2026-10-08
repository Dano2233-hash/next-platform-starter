import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  Share2,
  Package,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const packages = product?.packages?.length
    ? product.packages
    : [{ id: 'std', name: 'Standard Package', price: product?.price || 0, oldPrice: product?.oldPrice }];

  const [selectedPkg, setSelectedPkg] = useState(packages[0]);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested product could not be found or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0 || product.isComingSoon;
  const currentPrice = (selectedPkg ? selectedPkg.price : product.price) * quantity;
  const currentOldPrice = selectedPkg?.oldPrice ? selectedPkg.oldPrice * quantity : null;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPkg, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8">
        {/* Left Column: Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-80" />

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating || '5.0'} Rating</span>
            </div>
            <div className="text-slate-300 font-medium">
              <strong className="text-cyan-400">{product.soldCount}</strong> Sold
            </div>
            <div className="text-slate-300 font-medium">
              Stock: <strong className={isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}>{isOutOfStock ? 'Out' : product.stock}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Purchase Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-slate-900 text-slate-200 border border-slate-700">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{product.name}</h1>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white shrink-0"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            {copied && <p className="text-[11px] text-cyan-400">Link copied to clipboard!</p>}

            <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Package Selection */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-cyan-400" />
              Select Package Option
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {packages.map((pkg) => {
                const isSelected = selectedPkg?.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950/50'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-100">{pkg.name}</span>
                    <span className="block text-xs font-extrabold text-cyan-400 mt-1">
                      {formatPrice(pkg.price)}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Price Summary */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-cyan-300">
                  {formatPrice(currentPrice)}
                </span>
                {currentOldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(currentOldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Qty:</span>
              <div className="flex items-center bg-slate-900 rounded-xl border border-slate-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-slate-400 hover:text-white font-bold text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-extrabold text-slate-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-slate-400 hover:text-white font-bold text-xs"
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
              className={`py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 border transition-all ${
                isOutOfStock
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-cyan-400 hover:text-cyan-300 active:scale-95'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xl ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-950/50 active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Guarantees List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Email/WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>FastPay / Korek Accepted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Products"
          subtitle="Gamers also bought these items"
          products={relatedProducts}
        />
      )}
    </div>
  );
}
