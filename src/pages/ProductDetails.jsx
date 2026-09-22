import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { Star, ShieldCheck, Zap, ShoppingCart, ArrowLeft, Check, AlertCircle } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard', price: product.price, oldPrice: product.oldPrice });
      }
      setQuantity(1);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-slate-400 text-xs">The item you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  // Calculate discount percentage
  let discountPercent = 0;
  if (currentOldPrice && currentOldPrice > currentPrice) {
    discountPercent = Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100);
  }

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
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
    <div className="space-y-10 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Details Card */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Product Visual/Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
            <ProductImage product={product} heightClass="h-72 sm:h-80" />

            {discountPercent > 0 && (
              <span className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Verification Badges */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Official Publisher Code
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" /> Instant Automatic Delivery
            </div>
          </div>
        </div>

        {/* Right Column: Title, Package Options, Buy Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
                {product.type}
              </span>
              {isOutOfStock && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950 text-red-300 border border-red-800 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 0} Orders Completed</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-3">
            {product.description}
          </p>

          {/* Packages Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 text-white shadow-md shadow-cyan-950/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{pkg.name}</span>
                      <span className="font-extrabold text-cyan-400">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Quantity Row */}
          <div className="space-y-4 pt-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(currentPrice * quantity)}
              </span>
              {currentOldPrice && currentOldPrice > currentPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(currentOldPrice * quantity)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 text-xs font-black text-cyan-300">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 fill-black" /> Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 border border-slate-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>

            {/* Added Toast Notification */}
            {addedToast && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                Added package to cart successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Related Digital Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
