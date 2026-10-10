import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { ProductSection } from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  Headphones,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product && product.packages && product.packages.length > 0
      ? product.packages[0]
      : null;
  });

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="space-y-12">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Image Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-2">
            <ProductImage
              src={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              alt={product.name}
              className="w-full h-80 sm:h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-slate-300 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="font-semibold block">Instant Delivery</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <span className="font-semibold block">Official Code</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Headphones className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <span className="font-semibold block">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              {product.platform}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-purple-950 text-purple-300 border border-purple-800/60">
              {product.type}
            </span>
            {product.tag && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-950 text-amber-300 border border-amber-800/60">
                {product.tag}
              </span>
            )}
          </div>

          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Sold</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-slate-800">
            <span className="text-3xl font-black text-cyan-400 tracking-tight">
              {formatPrice(currentPrice * quantity)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-slate-500 line-through font-semibold">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Package / Option:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{pkg.name}</div>
                        <div className="text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-400 hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold text-white w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Products"
          subtitle="You might also be interested in these digital items"
          products={relatedProducts}
          viewAllLink="/products"
        />
      )}

    </div>
  );
};
