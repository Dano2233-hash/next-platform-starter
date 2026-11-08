import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  CheckCircle,
  Truck,
  RotateCcw,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

export function ProductDetails() {
  const { slugOrId } = useParams();
  const { products } = useProducts();
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slugOrId || p.id === slugOrId);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The digital product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'p1', name: 'Standard Edition', price: product.price }];

  const activePackage = packages[selectedPackageIndex] || packages[0];
  const isOutOfStock = Number(product.stock) <= 0;
  const currentPrice = activePackage.price || product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    setIsDrawerOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, activePackage, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-cyan-400 transition-colors">Store</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 capitalize transition-colors">
          {product.category?.replace(/-/g, ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090d1c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Left Column: Image with Fallback */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-[#060a14]">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              type={product.type}
              className="h-80 sm:h-96 w-full object-cover"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-300 block">Instant</span>
              <span className="text-[10px] text-slate-500">Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-300 block">100% Legal</span>
              <span className="text-[10px] text-slate-500">Genuine Code</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <RotateCcw className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-300 block">Fast Support</span>
              <span className="text-[10px] text-slate-500">WhatsApp 24/7</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Form */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/80">
                {product.type}
              </span>
              {isOutOfStock ? (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800">
                  Out of Stock
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                  In Stock ({product.stock} units)
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-200 text-sm">{Number(product.rating || 4.9).toFixed(1)}</span>
                <span className="text-slate-500">(150+ reviews)</span>
              </div>
              <span>•</span>
              <span className="text-slate-300 font-medium">{product.soldCount || 1000}+ Orders completed</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1630] to-[#110d2b] border border-cyan-500/20 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Current Price</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
                  {formatPrice(currentPrice * quantity)}
                </span>
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="text-right">
                  <span className="text-xs text-slate-500 line-through font-mono block">
                    {formatPrice(product.oldPrice * quantity)}
                  </span>
                  <span className="text-xs font-bold text-rose-400">Save on this pack</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Package / Variant Selection */}
            {packages.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Select Package / Edition</span>
                  </label>
                  <span className="text-xs text-cyan-400 font-mono">{activePackage.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packages.map((pkg, idx) => (
                    <button
                      key={pkg.id || idx}
                      type="button"
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPackageIndex === idx
                          ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-white truncate">{pkg.name}</span>
                        {selectedPackageIndex === idx && (
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-cyan-300 font-mono block mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-0.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  disabled={quantity >= 20 || quantity >= product.stock}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-0.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                isOutOfStock
                  ? 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 shadow-md cursor-pointer'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950 cursor-pointer'
              }`}
            >
              <span>{isOutOfStock ? 'Sold Out' : 'Buy Now'}</span>
              {!isOutOfStock && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
