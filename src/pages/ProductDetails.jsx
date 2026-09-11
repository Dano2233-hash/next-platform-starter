import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Zap,
  Star,
  ShieldCheck,
  CheckCircle2,
  Package,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Store
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const isOutOfStock = product.stock <= 0;

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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-16">

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Main Grid: Image Column & Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">

        {/* Left: Product Media */}
        <div className="space-y-4">
          <ProductImage product={product} className="h-72 sm:h-96" />

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Instant Delivery
              </span>
              <p className="text-[11px] text-slate-400">Digital code or direct ID top-up processed instantly.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Genuine
              </span>
              <p className="text-[11px] text-slate-400">Official license key guaranteed for Kurdistan & Iraq.</p>
            </div>
          </div>
        </div>

        {/* Right: Info & Package Selector */}
        <div className="space-y-6">

          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-black bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-black bg-purple-950 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-md text-xs font-black bg-blue-600 text-white">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating} / 5.0 Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-bold">{product.soldCount}+ Orders Completed</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
            {product.description}
          </p>

          {/* Packages Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package Denomination:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-950 to-blue-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block font-extrabold text-xs text-white">{pkg.name}</span>
                      <span className="block text-xs font-bold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing Row */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Total Unit Price
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-cyan-400">
                {formatPrice(currentPrice)}
              </span>
              {product.oldPrice && product.oldPrice > currentPrice && (
                <span className="text-sm font-semibold text-slate-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity selector & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-400">Quantity:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-extrabold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link copied to clipboard!' : 'Share product link'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You Might Also Like"
          subtitle="Similar gaming products & top-ups"
          icon={Sparkles}
          products={relatedProducts}
        />
      )}

    </div>
  );
};

export default ProductDetails;
