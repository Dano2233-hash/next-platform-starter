import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Star, Zap, ShoppingCart, ShieldCheck, ArrowLeft, Plus, Minus, Layers, CheckCircle2 } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const packages = product?.packages || [];
  const [selectedPackage, setSelectedPackage] = useState(packages.length > 0 ? packages[0] : null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The digital item you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const isSale = product.oldPrice && product.oldPrice > currentPrice;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb / Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-4 shadow-xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          {/* Key Selling Features */}
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Instant Digital Code</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>100% Region Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Packages & Purchase Controls */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold px-2.5 py-0.5 rounded">
                {product.platform}
              </span>
              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-extrabold px-2.5 py-0.5 rounded">
                {product.type}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'}</span>
                <span className="text-slate-500 font-normal">({product.soldCount} sold)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {product.name}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selector */}
          {packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option ({packages.length})</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, index) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border-cyan-500 text-white shadow-md'
                          : 'bg-[#0a0e1a] hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 absolute top-2 right-2" />
                      )}
                      <div className="font-extrabold text-xs text-white truncate">{pkg.name}</div>
                      <div className="text-xs font-semibold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Quantity Box */}
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 space-y-6">

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Selected Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {isSale && (
                    <span className="text-sm line-through text-slate-500">
                      {formatPrice(product.oldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Quantity:</span>
                <div className="flex items-center bg-[#070b18] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-extrabold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                <span>Buy Now</span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
