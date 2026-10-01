import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import { useCart } from '../hooks/useCart.jsx';
import ProductImage from '../components/ProductImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  PackageCheck,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useProducts();
  const { addToCart, toggleCart } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-xs text-gray-400">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-cyan-500 text-gray-950 font-black text-xs rounded-xl"
        >
          Back to Store
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0 && !product.isComingSoon;
  const isComingSoon = product.isComingSoon;

  const activePrice = selectedPackage ? selectedPackage.price : product.price;
  const activeOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && !p.isComingSoon)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, selectedPackage, quantity);
    toggleCart();
  };

  const handleBuyNow = () => {
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Store Catalog</span>
      </Link>

      {/* Main Product Details Card */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-gray-800/80 bg-gray-900 shadow-xl">
            <ProductImage product={product} className="h-72 md:h-80" />
          </div>

          {/* Guarantee Box */}
          <div className="p-4 rounded-2xl bg-[#050814] border border-gray-800 space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dano Store Purchase Protection</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Official activation codes and top-ups guaranteed. Processed instantly after payment verification.
            </p>
          </div>
        </div>

        {/* Right Column: Title, Options & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badges & Category */}
          <div className="flex items-center gap-2 flex-wrap">
            {product.platform && (
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-700 text-gray-200 text-xs font-bold rounded-lg uppercase">
                {product.platform}
              </span>
            )}
            {product.type && (
              <span className="px-2.5 py-1 bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold rounded-lg uppercase">
                {product.type}
              </span>
            )}
            <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold rounded-lg uppercase">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {product.name}
          </h1>

          {/* Rating & Sold count */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 border border-amber-900/60 px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span>{product.rating || '4.9'} / 5.0 Rating</span>
            </div>

            {product.soldCount > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>{product.soldCount}+ Orders Delivered</span>
              </div>
            )}
          </div>

          {/* Price Box */}
          <div className="p-4 bg-[#050814] border border-gray-800 rounded-2xl flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Total Price (IQD)
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {formatPrice(activePrice * quantity)}
                </span>
                {activeOldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(activeOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {product.stock > 0 && !isComingSoon ? (
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-lg uppercase">
                In Stock ({product.stock})
              </span>
            ) : isComingSoon ? (
              <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold rounded-lg uppercase">
                Coming Soon
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-950 text-red-400 border border-red-800 text-xs font-bold rounded-lg uppercase">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Product Overview
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Packages selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block flex items-center gap-1">
                <PackageCheck className="w-4 h-4 text-cyan-400" /> Select Package / Option
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/30 text-white'
                          : 'bg-[#050814] border-gray-800 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{pkg.name}</div>
                      <div className="text-xs text-cyan-400 font-extrabold mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center gap-3 bg-[#050814] border border-gray-800 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold text-cyan-300 px-3">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isComingSoon}
              className="py-3.5 px-5 bg-[#091024] hover:bg-[#0f1b3d] border border-gray-700 hover:border-cyan-500 text-cyan-300 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || isComingSoon}
              className="py-3.5 px-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-gray-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
