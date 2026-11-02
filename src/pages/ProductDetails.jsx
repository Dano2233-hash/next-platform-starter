import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ArrowRight,
  Clock,
  CheckCircle2,
  Share2,
  ChevronLeft,
  Truck
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  const packages = product?.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Edition', price: product?.price || 0, oldPrice: product?.oldPrice || 0 }];

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const selectedPackage = packages[selectedPackageIndex] || packages[0];
  const isOutOfStock = Number(product.stock) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity, true);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity, false);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to catalog</span>
        </button>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Media / Visual Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#090d1a] p-2">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              heightClass="h-72 sm:h-96"
            />
            {product.oldPrice && product.oldPrice > product.price && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-lg shadow-lg flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>SAVE {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
              <Zap className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="font-bold text-slate-200">Instant</span>
              <span className="text-[10px] text-slate-500">Fast delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-blue-400 mb-1" />
              <span className="font-bold text-slate-200">100% Legal</span>
              <span className="text-[10px] text-slate-500">Official license</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
              <Clock className="w-4 h-4 text-purple-400 mb-1" />
              <span className="font-bold text-slate-200">24/7 Team</span>
              <span className="text-[10px] text-slate-500">Kurdistan / Iraq</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                {product.platform}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/40">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating?.toFixed(1) || '4.9'} Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Satisfied Gamers</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package Selection Tiers */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Select Package / Denomination:
              </span>
              <span className="text-xs text-cyan-400 font-semibold">
                {packages.length} {packages.length === 1 ? 'option' : 'options available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-100">{pkg.name}</h4>
                      {pkg.oldPrice && pkg.oldPrice > pkg.price && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {formatPrice(pkg.oldPrice)}
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-cyan-400">
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Quantity Controls */}
          <div className="p-4 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Unit Price</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(selectedPackage.price * quantity)}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Qty:</span>
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:text-white cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-slate-300 hover:text-white cursor-pointer font-bold"
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
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>{addedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Buy Now with Manual Payment</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Payment via <strong className="text-white">FastPay</strong>, <strong className="text-white">Korek</strong>, or <strong className="text-white">MasterCard</strong>. Instructions given upon checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-900">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            Gamers Also Purchased
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
