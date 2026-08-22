import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  CheckCircle2,
  Share2,
  Clock,
  ArrowLeft,
  PackageCheck,
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === id || p.id === id
  );

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <AlertCircle className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested product may have been moved or is currently unavailable.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;
  const hasDiscount = currentOldPrice && currentOldPrice > currentPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
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

  // Related products from same category/platform
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Navigation Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Visual Media Thumbnail */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#090e21] border border-slate-800 shadow-2xl p-2">
            <ProductImage
              image={product.image}
              title={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96 w-full rounded-2xl"
            />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-950/85 border border-slate-700/80 text-cyan-300 backdrop-blur-md">
                {product.platform || 'Digital'}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900/85 border border-slate-700/60 text-purple-300 backdrop-blur-md">
                {product.type || 'Service'}
              </span>
            </div>

            {hasDiscount && (
              <div className="absolute top-5 right-5 z-10">
                <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg">
                  SALE
                </span>
              </div>
            )}
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#090e21] border border-slate-800 rounded-2xl flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white">Authentic &amp; Legal</h5>
                <p className="text-[10px] text-slate-400">100% official codes</p>
              </div>
            </div>

            <div className="p-3 bg-[#090e21] border border-slate-800 rounded-2xl flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white">Instant Crediting</h5>
                <p className="text-[10px] text-slate-400">Fast processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Meta, Packages & Buy Controls */}
        <div className="lg:col-span-7 space-y-6 bg-[#090e21] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating || '5.0'} Rating</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {product.soldCount ? `${product.soldCount}+ Orders Completed` : 'In Stock'}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Share product link"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800 pt-5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Package / Tier <span className="text-cyan-400">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium">
                  {product.packages.length} Option(s) Available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#0f183d] border-cyan-500 ring-2 ring-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-[#060a17] hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold truncate">{pkg.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </div>
                      <span className="text-xs font-black text-cyan-400 block">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Bar */}
          <div className="p-4 bg-[#050813] border border-slate-800/90 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-heading">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Qty</span>
              <div className="flex items-center bg-[#090e21] border border-slate-700 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-slate-400 hover:text-cyan-400 font-black"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-slate-400 hover:text-cyan-400 font-black"
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
              className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700/80 hover:border-cyan-500/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now (Instant Checkout)</span>
            </button>
          </div>

          {/* Payment Notes */}
          <div className="p-3 bg-[#060a17] border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Manual payment supported via <strong className="text-slate-200">FastPay, Korek, MasterCard, and FIB</strong>. You will receive exact account details during checkout.
            </p>
          </div>
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-800 pt-10">
          <h3 className="font-heading font-extrabold text-xl text-white mb-6">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
