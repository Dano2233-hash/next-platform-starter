import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingCart,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Star,
  CheckCircle2,
  Layers,
  Plus,
  Minus,
  MessageCircle,
  Clock
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The requested gaming product does not exist.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'p-default', name: 'Standard Edition', price: product.price, oldPrice: product.oldPrice }];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage.price || product.price;
  const currentOldPrice = selectedPackage.oldPrice || product.oldPrice;
  const discountPercent = currentOldPrice && currentOldPrice > currentPrice
    ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Back link */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>
      </div>

      {/* Main Product Showcase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090e1c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Left Column: Product Visual/Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              height="h-72 sm:h-80"
            />

            {/* Platform & Type overlay badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-slate-900/90 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                {product.platform}
              </span>
              <span className="bg-slate-900/90 text-slate-300 border border-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                {product.type}
              </span>
            </div>

            {discountPercent && (
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-lg">
                -{discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
            <div className="p-3 rounded-xl bg-[#0c1222] border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Digital Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0c1222] border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Instant Local Processing</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '4.9'}</span>
              <span className="text-slate-400 font-normal">| {product.soldCount || 100}+ Satisfied Customers</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-bold">
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani',sans-serif]">
              {product.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Packages Selector */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Select Package / Denomination:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-white ring-1 ring-cyan-400 shadow-lg shadow-cyan-950/40'
                          : 'bg-[#0c1222] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <p className="text-xs font-bold leading-snug line-clamp-1">{pkg.name}</p>
                      <p className="text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity & Buy CTAs */}
          <div className="p-5 rounded-2xl bg-[#060a14] border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Total Price
                </span>
                <div className="flex items-baseline gap-2">
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

              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-300 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-white min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-300 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/60 active:scale-95 disabled:opacity-40"
              >
                <span>Instant Order Now</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              * Payment completed manually via FastPay, Korek, or MasterCard after checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white font-['Rajdhani',sans-serif]">
              You May Also Like
            </h3>
            <p className="text-xs text-slate-400">
              Related games and popular digital items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
