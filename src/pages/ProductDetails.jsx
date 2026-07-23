import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Clock, Check, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';

export function ProductDetails() {
  const { route, navigate } = useNavigation();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Find the matching product using the slug
  const product = products.find(p => p.slug === route.slug);

  // Set default selected package when product is loaded
  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard Edition', price: product.price });
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-red-500">Product Not Found</h1>
          <p className="text-sm text-gray-500 max-w-sm">The digital service or game you are looking for might have been moved or deactivated.</p>
          <button
            onClick={() => navigate('#/products')}
            className="px-6 py-2.5 rounded-xl bg-brand-blue text-xs font-bold uppercase tracking-wider text-white"
          >
            Back to Browse
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedPackage) return;
    addToCart(product, selectedPackage, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || !selectedPackage) return;
    addToCart(product, selectedPackage, quantity);
    navigate('#/checkout');
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => Math.max(1, prev - 1));

  // Determine platform badges layout colors
  const getPlatformStyle = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30';
      case 'xbox': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'playstation': return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'mobile': return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'giftcard': return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>

        {/* Details Wrapper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Visual Card */}
          <div className="lg:col-span-5 space-y-4">
            <ProductImage product={product} className="h-64 sm:h-80 md:h-96" />

            {/* Guarantee list */}
            <div className="p-4 rounded-xl bg-[#0d0d15] border border-brand-border/60 space-y-3">
              <div className="flex items-center gap-2.5 text-xs">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-cyan" />
                <div>
                  <p className="font-bold text-gray-200">100% Legal & Secured Keys</p>
                  <p className="text-[10px] text-gray-500">Every single package or top-up is sourced directly from certified issuers.</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Clock className="h-4.5 w-4.5 text-brand-cyan" />
                <div>
                  <p className="font-bold text-gray-200">Processing Within 15 Mins</p>
                  <p className="text-[10px] text-gray-500">Manual payment checking and voucher delivery completes instantly during open hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Selection Options */}
          <div className="lg:col-span-7 space-y-6">

            {/* Title Block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getPlatformStyle(product.platform)}`}>
                  {product.platform}
                </span>
                <span className="bg-white/5 text-gray-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/5">
                  {product.type}
                </span>
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="bg-red-950/40 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                    Only {product.stock} codes left!
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight text-white">
                {product.name}
              </h1>

              {/* Rating + Sold */}
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1 bg-[#0d0d15] border border-brand-border/60 px-2.5 py-1 rounded-md">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="font-extrabold text-gray-200">{Number(product.rating || 5.0).toFixed(1)}</span>
                </div>
                <div className="text-gray-500">
                  Total Sold: <span className="text-gray-300 font-semibold">{product.soldCount || 0}</span> orders
                </div>
                <div className="text-gray-500">
                  Stock: {isOutOfStock ? <span className="text-red-500 font-bold">OUT OF STOCK</span> : <span className="text-green-500 font-bold">AVAILABLE</span>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Description</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#0d0d15]/50 p-4 rounded-xl border border-brand-border/30">
                {product.description}
              </p>
            </div>

            {/* Package Selector */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Digital Option / Package</span>
                  <span className="text-brand-cyan text-[11px] lowercase">Prices in IQD</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.packages.map((pkg, idx) => {
                    const isSelected = selectedPackage?.name === pkg.name;
                    return (
                      <div
                        key={idx}
                        onClick={() => !isOutOfStock && setSelectedPackage(pkg)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-brand-blue/10 border-brand-cyan shadow-md shadow-brand-blue/5 text-white'
                            : 'bg-[#0d0d15] border-brand-border hover:border-brand-blue/50 text-gray-300 hover:text-white'
                        } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm font-bold tracking-tight">{pkg.name}</p>
                          <p className={`text-xs ${isSelected ? 'text-brand-cyan font-bold' : 'text-gray-500'}`}>
                            {formatPrice(pkg.price)}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="h-5 w-5 rounded-full bg-brand-cyan flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-[#050505] stroke-[4]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Buy Block */}
            <div className="p-5 rounded-2xl bg-[#0d0d15] border border-brand-border/80 space-y-4">

              <div className="flex items-center justify-between gap-4">
                {/* Selected Option Price details */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">Subtotal Price</span>
                  <div className="text-2xl font-black text-brand-cyan">
                    {selectedPackage ? formatPrice(selectedPackage.price * quantity) : formatPrice(product.price * quantity)}
                  </div>
                </div>

                {/* Quantity adjustments */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mr-2 hidden sm:inline">QTY:</span>
                  <div className="flex items-center bg-[#050505] border border-brand-border/60 rounded-xl overflow-hidden p-1">
                    <button
                      type="button"
                      onClick={decreaseQty}
                      className="px-2.5 py-1 text-sm font-black text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      -
                    </button>
                    <span className="px-3.5 text-sm font-bold text-white min-w-8 text-center select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQty}
                      className="px-2.5 py-1 text-sm font-black text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                    isAddedFeedback
                      ? 'bg-green-600/20 text-green-400 border-green-500/50'
                      : 'bg-transparent text-gray-300 border-brand-border/80 hover:text-white hover:border-brand-blue/50 hover:bg-brand-blue/5 disabled:opacity-50 disabled:pointer-events-none'
                  }`}
                >
                  <ShoppingCart className="h-4.5 w-4.5" />
                  {isAddedFeedback ? 'Item Added!' : 'Add to Cart'}
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 transition btn-glow flex items-center justify-center gap-2"
                >
                  Buy Instantly
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
