import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Zap, CheckCircle2, ArrowRight, Minus, Plus, Share2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find((p) => p.slug === id || p.id === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard Package', price: product.price, oldPrice: product.oldPrice });
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const hasDiscount = currentOldPrice && currentOldPrice > currentPrice;
  const discountPercent = hasDiscount ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link to="/products" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">{product.platform}</span>
        </div>
      </div>

      {/* Main Product Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090d1a] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ProductImage product={product} alt={product.name} className="h-64 sm:h-80" />

            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/30 font-extrabold text-xs uppercase tracking-wider backdrop-blur-md">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900/90 text-purple-400 border border-purple-500/30 font-extrabold text-xs uppercase tracking-wider backdrop-blur-md">
                {product.type}
              </span>
            </div>

            {hasDiscount && (
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-xs tracking-wider shadow-lg animate-pulse">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Instant Delivery</h4>
                <p className="text-[10px] text-slate-500">Fast digital key / top-up</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">100% Verified</h4>
                <p className="text-[10px] text-slate-500">Legal Kurdish gaming store</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selector */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-extrabold bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/30">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating || '4.9'}
              </span>
              <span className="text-slate-400">{product.soldCount || 1000}+ Orders Completed</span>
              <span className="text-emerald-400 font-semibold">• Stock Available</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                <span>Select Package Option:</span>
                <span className="text-slate-400 text-[11px] font-normal">Choose amount/tier</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950 to-cyan-950 border-cyan-400 text-white ring-1 ring-cyan-400 shadow-lg shadow-cyan-950'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{pkg.name}</div>
                      <div className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Price Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Added Toast Alert */}
            {addedToast && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Added to your shopping cart!
                </span>
                <button onClick={() => setIsCartOpen(true)} className="underline text-white font-extrabold cursor-pointer">
                  View Cart
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-100 font-extrabold text-xs border border-slate-700/80 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>Instant Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-extrabold text-white">Related Products You Might Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
