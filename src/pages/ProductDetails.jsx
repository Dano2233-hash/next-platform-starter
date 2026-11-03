import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowLeft,
  Share2,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug || p.id === slug);
  }, [products, slug]);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 max-w-lg mx-auto my-12">
        <h3 className="text-xl font-bold text-white mb-2">Product Not Found</h3>
        <p className="text-xs text-slate-400 mb-6">
          The requested product may have been updated or moved.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const unitPrice = Number(currentPackage.price);
  const totalPrice = unitPrice * quantity;
  const isOutOfStock = Number(product.stock) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-200 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual & Guarantee */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0b1120] border border-slate-800 rounded-3xl overflow-hidden p-2 shadow-2xl">
            <ProductImage product={product} height="h-72 sm:h-96" className="rounded-2xl" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <p className="font-bold text-white">Instant Fulfillment</p>
                <p className="text-[11px] text-slate-400">Digital keys and top-ups processed within 5 to 15 minutes.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="font-bold text-white">100% Genuine Digital Code</p>
                <p className="text-[11px] text-slate-400">Full warranty and official replacement in case of issues.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Badges, Package Selector & Buy */}
        <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {product.platform}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {product.type}
                </span>
                {product.tag && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-600 text-white">
                    {product.tag}
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
              >
                <Share2 size={13} />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2.5">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'}</span>
                <span className="text-slate-500">/ 5.0</span>
              </div>
              <span>•</span>
              <span className="text-emerald-400 font-medium">
                {product.soldCount ? `${product.soldCount.toLocaleString()} happy gamers` : 'Fast Delivery'}
              </span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {isOutOfStock ? 'Out of Stock' : `${product.stock} Available`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            <p>{product.description}</p>
          </div>

          {/* Package Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Choose Package / Denomination *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-500 shadow-md shadow-cyan-950/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                      {pkg.name}
                    </p>
                    <p className="text-xs font-mono font-bold text-slate-300 mt-1">
                      {formatPrice(pkg.price)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Live Total */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 w-fit">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-400 hover:text-white disabled:opacity-30 px-1"
                >
                  -
                </button>
                <span className="font-bold text-sm text-white font-mono w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-400 hover:text-white px-1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-slate-400 block">Total Price:</span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 hover:border-cyan-500/60 active:scale-98'
              }`}
            >
              <Layers size={16} />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-950/50 ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 active:scale-98'
              }`}
            >
              <Zap size={16} className="fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
