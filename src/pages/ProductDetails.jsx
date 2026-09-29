import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ShoppingCart,
  ArrowLeft,
  Flame,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else if (product) {
      setSelectedPackage({ id: 'std', name: product.name, price: product.price, oldPrice: product.oldPrice });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or was removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0 || product.stock === '0' || product.stock === 'Out of Stock';

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1c] border border-slate-800/90 rounded-2xl p-4 overflow-hidden relative shadow-2xl">
            {product.tag && (
              <span className="absolute top-6 left-6 z-10 px-3 py-1 rounded-md bg-cyan-500 text-slate-950 font-extrabold text-xs uppercase shadow-md">
                {product.tag}
              </span>
            )}
            <ProductImage product={product} className="h-72 sm:h-80" />
          </div>

          {/* Guarantee Box */}
          <div className="bg-[#070b18] border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              100% Genuine Digital Code / Top-Up Guarantee
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Direct authorization from official distribution partners. Fast code delivery or automated player ID recharge.
            </p>
          </div>
        </div>

        {/* Right Product Options */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 border-b border-slate-800/80 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs ml-auto">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.soldCount}+ Sold)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{product.name}</h1>
            <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Package / Denomination:
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
                          ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-400 shadow-md shadow-cyan-950/50 scale-[1.02]'
                          : 'bg-[#090d1c] hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-extrabold text-xs text-slate-100">{pkg.name}</p>
                      <p className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity & Actions */}
          <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Total Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-300">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Qty:</span>
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-0.5 text-slate-300 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-black text-cyan-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-0.5 text-slate-300 hover:text-white font-bold"
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
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-500/50 font-extrabold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery & How to Redeem */}
          <div className="bg-[#070b18] border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <h4 className="font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              How to complete order:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed pl-1">
              <li>Select your preferred package option and click Buy Now or Add to Cart.</li>
              <li>Fill in your name, phone number (WhatsApp), and select FastPay, Korek, or MasterCard.</li>
              <li>Submit order and send payment screenshot to our customer agent to receive your key / top-up instantly.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800/80">
          <h3 className="text-xl font-extrabold text-slate-100 mb-6">
            Related Products in {product.category}
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
}
