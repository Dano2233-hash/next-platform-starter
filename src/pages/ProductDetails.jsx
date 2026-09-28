import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
        </Link>
      </div>
    );
  }

  const hasPackages = product.packages && product.packages.length > 0;
  const [selectedPackage, setSelectedPackage] = useState(hasPackages ? product.packages[0] : null);
  const [quantity, setQuantity] = useState(1);

  const activePrice = selectedPackage ? selectedPackage.price : product.price;
  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-cyan-400">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 truncate">{product.name}</span>
      </nav>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl">

        {/* Left Column: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            className="w-full h-80 sm:h-96 object-cover"
          />

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-slate-200">100% Verified</p>
                <p className="text-[10px] text-slate-400">Official license code</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-slate-200">Fast Delivery</p>
                <p className="text-[10px] text-slate-400">Player ID & Direct Key</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Options & Actions */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Platform & Type Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                {product.platform || 'Digital'}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
                {product.type || 'Game'}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-md">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || '4.9'}</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-medium">{product.soldCount || 100}+ Satisfied Customers</span>
              <span className="text-slate-500">•</span>
              <span className={`font-bold ${isOutOfStock ? 'text-red-400' : 'text-emerald-400'}`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Package Selection */}
            {hasPackages && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Select Package Option:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 text-cyan-300'
                            : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{pkg.name}</p>
                        <p className="text-xs font-extrabold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-extrabold text-xs text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price Box */}
            <div className="pt-4 border-t border-slate-800 flex items-baseline gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Price:</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(activePrice * quantity)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-6 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-6 rounded-2xl font-extrabold text-xs bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Games & Services"
          subtitle="Other popular choices in this category"
          products={relatedProducts}
        />
      )}
    </div>
  );
};

export default ProductDetails;
