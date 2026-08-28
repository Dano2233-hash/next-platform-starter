import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';

export function ProductDetails({ products = [], onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else if (product) {
      setSelectedPackage({ name: 'Standard Package', price: product.price });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-12">

      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
            <ProductImage product={product} height="h-72 sm:h-96" />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Delivery Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Codes and top-up credentials are delivered instantly to your screen and WhatsApp upon payment verification.
            </p>
          </div>
        </div>

        {/* Right Product Controls & Package Selector */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800">

          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wide">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200">{product.rating || '5.0'}</span>
                <span>({product.soldCount || 0} orders completed)</span>
              </div>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock} units)`}
              </span>
            </div>
          </div>

          {/* Price Display */}
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Price</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-cyan-400">
                {formatPrice(currentPrice * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-slate-400">
                  ({formatPrice(currentPrice)} each)
                </span>
              )}
            </div>
          </div>

          {/* Package Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package / Amount <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/30'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold truncate">{pkg.name}</span>
                      <span className="text-cyan-400 font-extrabold mt-1">{formatPrice(pkg.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-100 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Added Notice Banner */}
          {addedNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Item added to your shopping cart successfully!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Description Details */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Item Description</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Similar Products You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;
