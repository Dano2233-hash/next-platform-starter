import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, ShoppingCart, ShieldCheck, Zap, Plus, Minus } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products, onAddToCart, onBuyNow }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      // Auto-select first package if exists
      if (found.packages && found.packages.length > 0) {
        setSelectedPackage(found.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    } else {
      setProduct(null);
    }
  }, [slug, products]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-gray-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase text-cyan-400 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  // Pricing computation
  const basePrice = selectedPackage ? selectedPackage.price : product.price;
  const oldPrice = selectedPackage ? Math.round(selectedPackage.price * 1.2) : product.oldPrice;
  const totalPrice = basePrice * quantity;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedPackage, quantity);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Back button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase text-cyan-400 hover:text-cyan-300 transition"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main product card detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left Side: Product Visual / Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-80 sm:h-96" />

          <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2 text-xs text-gray-400">
            <span className="font-bold text-gray-300 block">DANO STORE GUARANTEE:</span>
            <p className="leading-relaxed">
              We provide manual delivery for game keys, codes, and top-ups within 10-30 minutes of payment confirmation. All products are 100% legal, directly acquired from authorized vendors.
            </p>
          </div>
        </div>

        {/* Right Side: Detailed Selection & Purchase Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Row */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-cyan-950/40 text-cyan-400 border border-cyan-800/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-950/40 text-purple-400 border border-purple-800/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-950/40 text-amber-400 border border-amber-800/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Sold statistics */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-200">{product.rating}</span>
                <span>(Official Rating)</span>
              </div>
              <span className="text-gray-600">|</span>
              <div>
                <span className="text-gray-500">Sold Count:</span>{' '}
                <span className="font-bold text-gray-300">{product.soldCount}</span>
              </div>
              <span className="text-gray-600">|</span>
              <div>
                <span className="text-gray-500">Status:</span>{' '}
                {isOutOfStock ? (
                  <span className="font-extrabold text-rose-400 uppercase">Out of Stock</span>
                ) : (
                  <span className="font-extrabold text-emerald-400 uppercase">In Stock ({product.stock})</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 border-t border-white/[0.04] pt-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block">About this product</span>
            <p className="text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Picker options */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-white/[0.04] pt-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block">
                Select Option / Package
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/20 shadow'
                          : 'border-white/[0.04] bg-black/20 hover:bg-black/40 hover:border-white/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-white">{pkg.name}</span>
                      <span className={`text-xs font-black ${isSelected ? 'text-cyan-400' : 'text-gray-300'}`}>
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector & total row */}
          <div className="p-4 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 flex flex-wrap items-center justify-between gap-4">
            {/* Quantity */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Quantity</span>
              <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/10 p-1">
                <button
                  onClick={handleDecrement}
                  disabled={isOutOfStock}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-black px-3 text-white">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={isOutOfStock}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Total Pricing info */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Price</span>
              <div className="flex items-baseline justify-end gap-2">
                {oldPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(oldPrice * quantity)}
                  </span>
                )}
                <span className="text-xl font-black text-cyan-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold uppercase border transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-gray-400'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-black uppercase transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-gray-950 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-400 transform hover:-translate-y-0.5'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Instant Buy</span>
            </button>
          </div>

          {/* Security Features Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <span>Verified Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Zap className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <span>Instant Loading</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Star className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span>5★ Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
