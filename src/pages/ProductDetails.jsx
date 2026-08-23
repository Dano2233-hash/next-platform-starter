import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShoppingCart, Zap, ArrowLeft, ShieldCheck, Check, Package, Clock } from 'lucide-react';

export function ProductDetails({ products, onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const [selectedPkg, setSelectedPkg] = useState(() => {
    return product.packages && product.packages.length > 0 ? product.packages[0] : null;
  });

  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedPkg ? selectedPkg.price * quantity : product.price * quantity;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product, selectedPkg, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      onBuyNow(product, selectedPkg, quantity);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Left Column - Product Showcase Image */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              height="h-72 sm:h-80"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine & Verified Key / Top-Up</span>
            </div>
            <p className="text-slate-400">
              Direct digital code or account top-up. Delivery executed immediately upon manual payment confirmation.
            </p>
          </div>
        </div>

        {/* Right Column - Purchase Details & Packages */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase border border-cyan-500/30">
                {product.platform || 'Digital'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold text-xs uppercase border border-purple-500/30">
                {product.type || 'Product'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'} Rating</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Orders Completed</span>
              <span>•</span>
              <span className={product.stock > 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package / Quantity Option:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPkg && selectedPkg.id === pkg.id;
                  return (
                    <button
                      key={pkg.id || pkg.name}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="line-clamp-1">{pkg.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                      </div>
                      <span className="text-xs font-extrabold text-cyan-400">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-slate-300 uppercase">Quantity:</span>
            <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
              >
                -
              </button>
              <span className="px-4 text-sm font-extrabold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Price:</span>
              <span className="text-2xl font-black text-cyan-400">{formatPrice(currentPrice)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
