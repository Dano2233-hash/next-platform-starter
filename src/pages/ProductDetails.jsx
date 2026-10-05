import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Check,
  ChevronRight,
  Package,
  Flame,
  Clock,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug or id
  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-black text-slate-100">Product Not Found</h2>
        <p className="text-slate-400 text-xs">
          The requested product may have been removed or renamed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Package', price: product.price }];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isSale = product.oldPrice && product.oldPrice > selectedPackage.price;
  const isOutOfStock = product.stock <= 0;

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-300 font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main Product Hero Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Product Image Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-2 rounded-2xl border border-cyan-500/20 shadow-xl overflow-hidden relative group">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              className="h-80 sm:h-96"
            />

            {/* Platform & Type Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                {product.platform}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-xs font-semibold text-slate-200 border border-slate-700/60">
                {product.type}
              </span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center gap-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Code</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center gap-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>24/7 Delivery</span>
            </div>
          </div>
        </div>

        {/* Right: Options & Checkout Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase tracking-widest">
                  {product.tag}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Stock Available
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount || 100}+ Orders Completed</span>
              <span>•</span>
              <span className="text-cyan-400 font-medium">{product.stock > 0 ? `${product.stock} Units Left` : 'Out of Stock'}</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Package Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Select Package / Quantity</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg) => {
                const isSelected = selectedPackage.name === pkg.name;
                return (
                  <button
                    key={pkg.name}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-slate-100 shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <span className="block font-extrabold text-xs">{pkg.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Fast Delivery</span>
                    </div>

                    <span className="font-extrabold text-sm text-cyan-300">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity selector & Price calculation */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Price</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(selectedPackage.price * quantity)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 mr-2">Qty:</span>
              <div className="flex items-center gap-1 bg-slate-950 rounded-xl border border-slate-700 px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-400 hover:text-cyan-400 p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-slate-100 px-3 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-400 hover:text-cyan-400 p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Success Notice Banner */}
          {addedNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-pulse">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Added {selectedPackage.name} x{quantity} to cart!</span>
              </span>
              <Link to="/cart" className="underline hover:text-white">View Cart</Link>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-6 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                isOutOfStock
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-cyan-500/40 bg-slate-900 hover:bg-cyan-950/40 text-cyan-300 hover:border-cyan-400'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-800/80">
          <h3 className="text-xl font-extrabold text-slate-100 mb-6">Related Digital Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
