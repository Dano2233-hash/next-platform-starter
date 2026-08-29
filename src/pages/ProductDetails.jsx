import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle,
  ShieldCheck,
  Package,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">
          The requested product does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Back button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Image Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0c101c] p-2">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              heightClass="h-72 sm:h-80"
            />

            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="px-4 py-2 bg-red-600/90 text-white font-black text-sm uppercase tracking-wider rounded-lg border border-red-500 shadow-xl">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-white font-bold text-xs">Official & Verified License</h4>
                <p className="text-slate-400 text-[11px]">100% legal digital code and direct top-ups.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-white font-bold text-xs">Instant Transfer</h4>
                <p className="text-slate-400 text-[11px]">Processed immediately after local payment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Product Details Column */}
        <div className="lg:col-span-7 space-y-6">

          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold uppercase">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating} Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-medium">
                {product.soldCount > 0 ? `${product.soldCount.toLocaleString()} Successful Orders` : 'New Product'}
              </span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-5 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400 block mb-0.5">
                Total Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOldPrice && (
                  <span className="text-slate-500 line-through text-sm">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Package Selection (If product has multiple packages) */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package / Quantity Variant:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-500/40'
                          : 'bg-[#0c101c] border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block truncate">
                        {pkg.name}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400 block mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2 border-t border-slate-800/80 pt-4">
            <h4 className="text-xs font-bold uppercase text-slate-300">Product Overview</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Action Notification */}
          {addedMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Added to cart successfully!</span>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-600/25 active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
