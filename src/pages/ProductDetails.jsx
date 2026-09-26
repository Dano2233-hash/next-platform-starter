import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Package,
  Plus,
  Minus,
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
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
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Previous Page</span>
      </button>

      {/* Main Product Card Grid */}
      <div className="bg-[#070c1e] border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
        {/* Left: Product Image & Fallback Visual */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-72 sm:h-96" />

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="block font-bold text-slate-200">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Official Product</span>
              </div>
            </div>
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <span className="block font-bold text-slate-200">Instant Delivery</span>
                <span className="text-[10px] text-slate-400">Direct Code / ID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badges Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-3 py-1 rounded-full text-xs font-bold">
                {product.platform || 'Multi-Platform'}
              </span>
              <span className="bg-purple-950/80 text-purple-300 border border-purple-800/60 px-3 py-1 rounded-full text-xs font-bold">
                {product.type || 'Digital Item'}
              </span>
              {product.tag && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} / 5.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span>{product.soldCount || 150}+ Sales Completed</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#0d142b] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOldPrice && currentOldPrice > currentPrice && (
                  <span className="text-sm text-slate-500 line-through font-semibold">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Package Selector */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>Select Package / Amount:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                            : 'bg-[#090f22] border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="block font-bold text-xs">{pkg.name}</span>
                        <span className="block text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#090f22] border border-slate-800 rounded-xl p-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-slate-100 text-sm px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {isOutOfStock ? (
                    <span className="text-red-400 font-bold">Currently Out of Stock</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">In Stock &amp; Ready</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now</span>
              </button>
            </div>

            {addedToast && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to cart successfully!</span>
              </div>
            )}
          </div>

          {/* Description Box */}
          <div className="pt-6 border-t border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Product Description</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 uppercase">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
