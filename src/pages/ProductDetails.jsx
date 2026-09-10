import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle, ShieldCheck, ArrowLeft, Package, Clock } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Product Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested product or game top-up code does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8">
        {/* Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage
            src={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="w-full h-72 sm:h-96 rounded-2xl border border-slate-800 shadow-2xl"
          />

          {/* Delivery & Security Guarantee */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-medium">Instant Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-slate-300 font-medium">100% Legal Code</span>
            </div>
          </div>
        </div>

        {/* Product Details Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'} Rating</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-semibold">{product.soldCount || 0}+ Completed Orders</span>
              <span>•</span>
              <span className={isOutOfStock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-4">
            {product.description}
          </p>

          {/* Package Variations */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Choose Package / Variation *</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-100 line-clamp-1">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Actions */}
          <div className="pt-4 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-cyan-400 tracking-tight">
                {formatPrice(currentPrice * quantity)}
              </span>
              {product.oldPrice && product.oldPrice > currentPrice && (
                <span className="text-sm line-through text-slate-500 font-medium">
                  {formatPrice(product.oldPrice * quantity)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Quantity:
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-extrabold text-slate-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700/80 disabled:opacity-50 transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/50 disabled:opacity-50 transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
