import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Clock,
  Check,
  ChevronRight,
  Share2,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, openDrawer } = useCart();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug || p.id === slug);
  }, [products, slug]);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Sync selected package if product changes
  React.useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;
  const hasSale = currentOldPrice && currentOldPrice > currentPrice;
  const discountPercent = hasSale
    ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    openDrawer();
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-white capitalize transition-colors">
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#080d1a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              productName={product.name}
              category={product.category}
              platform={product.platform}
              className="aspect-[16/11]"
            />
          </div>

          {/* Quick highlight cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-white block">Fast Delivery</span>
                <span className="text-[10px] text-slate-400 block">3 - 10 Minutes</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-white block">Official & Legal</span>
                <span className="text-[10px] text-slate-400 block">Guaranteed Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-cyan-500/30">
                  {product.platform}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {product.type}
                </span>
                {product.tag && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-blue-600/30 text-blue-300 border border-blue-500/40">
                    {product.tag}
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            {/* Title & Ratings */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating?.toFixed(1) || '5.0'}</span>
                </div>
                <span>•</span>
                <span>{product.soldCount}+ Orders Completed</span>
                <span>•</span>
                <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-1">
                  {selectedPackage ? selectedPackage.name : 'Price'}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-cyan-400 tracking-tight">
                    {formatPrice(currentPrice)}
                  </span>
                  {hasSale && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(currentOldPrice)}
                    </span>
                  )}
                  {hasSale && (
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Instant Digital Delivery
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Direct Player ID / Code Activation
                </span>
              </div>
            </div>

            {/* Package Selection Options */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Select Package Option:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-[#0e1933] border-cyan-400 shadow-md shadow-cyan-950 ring-1 ring-cyan-400'
                            : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-xs text-white truncate">{pkg.name}</div>
                        <div className="text-xs font-black text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Description & Activation Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#060a14] p-3.5 rounded-xl border border-slate-800/80">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Row: Quantity + Add to Cart + Buy Now */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between w-full sm:w-auto bg-slate-900 border border-slate-750 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-extrabold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now button */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-cyan-950/50'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              Manual payment verification via FastPay, Korek, and MasterCard.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>You Might Also Like</span>
            </h3>
            <Link to={`/products?category=${product.category}`} className="text-xs font-semibold text-cyan-400 hover:underline">
              View More
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
