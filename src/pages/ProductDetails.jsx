import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Flame,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const { getProductBySlugOrId, products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const product = getProductBySlugOrId(slug);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-[#0a0e1a] rounded-2xl border border-slate-800 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-black text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested gaming item, package, or subscription code could not be found.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages || [];
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);

  const selectedPackage = packages.length > 0 ? packages[selectedPackageIndex] : null;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice || product.oldPrice : product.oldPrice;

  const isSale = currentOldPrice && currentOldPrice > currentPrice;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, 1);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-12">

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Card Grid */}
      <div className="bg-[#0a0e1c] rounded-3xl border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">

        {/* Left Column - Image Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ProductImage
              src={product.image}
              alt={product.name}
              title={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-80 object-cover"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                {product.platform}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                {product.type}
              </span>
            </div>

            {isSale && (
              <div className="absolute top-3 right-3 z-10">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-rose-600 text-white shadow-lg animate-pulse">
                  SALE
                </span>
              </div>
            )}
          </div>

          {/* Local Security Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-200 text-[11px]">Instant Delivery</h5>
                <p className="text-[10px] text-slate-500">Delivered within 3 minutes</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-200 text-[11px]">100% Official</h5>
                <p className="text-[10px] text-slate-500">Authorized local codes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">

          <div>
            {/* Title & Sold Stats */}
            <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'} rating</span>
              </div>
              <span className="text-slate-500 font-medium">{product.soldCount}+ completed orders</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Display */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                Selected Price
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(currentPrice)}
                </span>
                {isSale && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(currentOldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Stock Status</span>
              {isOutOfStock ? (
                <span className="text-xs font-bold text-rose-400">Out of Stock</span>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock})
                </span>
              )}
            </div>
          </div>

          {/* Package Selection Grid (if packages exist) */}
          {packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                Select Package / Amount:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = idx === selectedPackageIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-bold truncate">{pkg.name}</span>
                      <span className="block text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 hover:text-cyan-400 hover:border-cyan-500 font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Instant Buy Now</span>
              </button>
            </div>

            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Questions? Ask Dano Store WhatsApp Support</span>
            </a>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-lg font-black text-white">Related Gaming Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
