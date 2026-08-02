import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Star, ShieldCheck, ShoppingCart, ArrowLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function ProductDetails() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Extract slug from route/pathname
    const pathParts = window.location.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    if (slug) {
      const found = products.find((p) => p.slug === slug);
      if (found) {
        setProduct(found);
        // Automatically pre-select first package if it exists
        if (found.packages && found.packages.length > 0) {
          setSelectedPackage(found.packages[0]);
        }
      }
    }
  }, [products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-800/40 flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Product Not Found</h3>
          <p className="text-gray-400 text-xs mt-1">This game listing does not exist or has been removed from our catalog.</p>
        </div>
        <a href="/products" className="inline-block bg-[#111124] hover:bg-[#1a1a36] border border-white/10 text-gray-200 px-6 py-2.5 rounded-xl text-xs font-bold uppercase">
          Back To Store
        </a>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  // Package change helper
  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSuccessMsg('');
  };

  const getActivePrice = () => {
    if (selectedPackage) {
      return selectedPackage.price;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const packageName = selectedPackage ? selectedPackage.name : 'Standard';
    const packagePrice = getActivePrice();

    addToCart(product, packageName, packagePrice, quantity);

    setSuccessMsg(`Successfully added ${quantity}x ${product.name} (${packageName}) to your cart!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const packageName = selectedPackage ? selectedPackage.name : 'Standard';
    const packagePrice = getActivePrice();

    addToCart(product, packageName, packagePrice, quantity);
    window.location.href = '/checkout';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">

      {/* Breadcrumbs */}
      <a href="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store Catalog</span>
      </a>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Aspect Ratio Header Preview Grid (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#07070e] border border-white/5 p-3 rounded-2xl shadow-xl">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-950">
              <ProductImage product={product} className="w-full h-full object-cover" />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-red-950/80 text-red-400 text-xs font-black tracking-widest uppercase border border-red-800/60 px-6 py-3 rounded-xl">
                    Out Of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Secure details box */}
          <div className="bg-[#080811] border border-white/5 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Legal Digital Goods</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Licensed activation keys and official top-up codes only. Direct safe delivery in Kurdistan / Iraq.
              </p>
            </div>
          </div>
        </div>

        {/* Right Details Configurator Area (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tags and badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-blue-950/60 text-blue-400 border border-blue-800/40 px-2.5 py-1 rounded-md">
              {product.platform}
            </span>
            <span className="text-[10px] font-bold bg-[#111122] text-gray-300 border border-white/5 px-2.5 py-1 rounded-md">
              {product.type}
            </span>
            {product.tag && (
              <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-950/40 text-cyan-400 border border-cyan-800/30 px-2.5 py-1 rounded-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Title and descriptions */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-gray-200 font-bold">{product.rating} / 5</span>
              </div>
              {product.soldCount > 0 && (
                <span>&bull; {product.soldCount} gamers purchased</span>
              )}
              <span>&bull; Stock status: <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{product.stock > 0 ? `${product.stock} items left` : 'Out of stock'}</span></span>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed bg-[#080811] p-4 rounded-xl border border-white/5">
            {product.description}
          </p>

          {/* PACKAGE / TOP-UP SELECTOR */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                Select Package / Top-Up Coin Volume:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.packages.map((pkg) => {
                  const isPkgSelected = selectedPackage && selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={pkg.name}
                      onClick={() => handleSelectPackage(pkg)}
                      className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                        isPkgSelected
                          ? 'bg-[#0f0f1f] border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-[#080811] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isPkgSelected ? 'text-cyan-400' : 'text-gray-200'}`}>
                        {pkg.name}
                      </span>
                      <span className="text-xs font-black text-white">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PRICING AREA AND ACTION SECTOR */}
          <div className="bg-[#080811] border border-white/5 rounded-2xl p-6 space-y-4">

            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Selected Product Total</span>
                <span className="text-2xl font-black text-white">
                  {formatPrice(getActivePrice() * quantity)}
                </span>
              </div>

              {product.oldPrice && !selectedPackage && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.oldPrice * quantity)}
                </span>
              )}
            </div>

            {successMsg && (
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-cyan-300 font-bold text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Quantity Selector and Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-white/10 rounded-xl p-2.5 bg-[#0d0d1a] sm:w-32">
                <button
                  disabled={quantity <= 1 || isOutOfStock}
                  onClick={() => setQuantity(quantity - 1)}
                  className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-base transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-black text-white">{quantity}</span>
                <button
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-base transition-colors"
                >
                  +
                </button>
              </div>

              {/* Cart Button */}
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-[#111122] border-white/10 hover:border-cyan-500/40 text-gray-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Shopping Cart</span>
              </button>

              {/* Buy Button */}
              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg ${
                  isOutOfStock
                    ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white shadow-blue-500/20 hover:scale-[1.01]'
                }`}
              >
                <span>Direct Purchase</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
