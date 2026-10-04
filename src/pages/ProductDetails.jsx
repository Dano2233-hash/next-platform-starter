import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ShoppingCart, Zap, Star, ShieldCheck, Layers, Plus, Minus, Check } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

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

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </button>
      </div>

      {/* Main Details Grid Card */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ProductImage product={product} className="h-72 sm:h-96 w-full" />

            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-purple-950/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                {product.type}
              </span>
            </div>

            {product.tag && (
              <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-extrabold uppercase bg-amber-500 text-slate-950 shadow-lg">
                {product.tag}
              </span>
            )}
          </div>

          {/* Guarantees Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Guaranteed & Safe Reload</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Verified digital keys and instant top-ups for Kurdistan & Iraq. Supported via FastPay, Korek, and MasterCard.
            </p>
          </div>
        </div>

        {/* Right Column: Order Configuration */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">

            {/* Title & Stats */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'} Rating</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium">{product.soldCount || 100}+ Satisfied Customers</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-100">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Total Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status Badge */}
              <div>
                {isOutOfStock ? (
                  <span className="px-3 py-1 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-bold">
                    Out of Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    In Stock ({product.stock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Package Selector (if available) */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" /> Select Package / Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-100">{pkg.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <span className="text-xs font-bold text-cyan-400 mt-1.5">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-extrabold text-xs text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-current" />
              Buy Now (Instant Checkout)
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="font-heading text-lg font-bold text-slate-100">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
