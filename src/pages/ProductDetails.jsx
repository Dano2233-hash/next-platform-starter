import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  CheckCircle2,
  ShoppingCart,
  Zap,
  ShieldCheck,
  ChevronRight,
  Package,
  AlertCircle,
  Clock,
  HelpCircle
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4 my-12">
        <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ id: 'std', name: 'Standard Item', price: product.price, oldPrice: product.oldPrice }];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const currentPrice = (selectedPackage ? selectedPackage.price : product.price) * quantity;
  const currentOldPrice = selectedPackage && selectedPackage.oldPrice ? selectedPackage.oldPrice * quantity : 0;

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
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-cyan-400 transition-colors">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 truncate">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Product Image Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <ProductImage product={product} className="w-full h-80 rounded-xl" />

            {/* Badges Overlay */}
            <div className="flex items-center justify-between mt-4 border-t border-slate-800 pt-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold text-xs uppercase">
                  {product.platform}
                </span>
                <span className="px-3 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800/60 font-bold text-xs uppercase">
                  {product.type}
                </span>
              </div>

              {product.tag && (
                <span className="px-3 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold text-xs">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <span>Dano Store Buyer Protection</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 pl-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Official & Legal Codes</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Instant Code or Player ID Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>24/7 Kurdistan & Iraq Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Product Selection Options */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">

            {/* Title & Stats */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-white font-bold">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
                </div>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{product.soldCount || 0} Orders Completed</span>
                <span>•</span>
                <span className="text-cyan-400 font-bold">In Stock ({product.stock})</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-4">
              {product.description || 'Premium digital gaming product with instant automated or manual delivery for players in Kurdistan & Iraq.'}
            </p>

            {/* Package Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Select Package Option <span className="text-rose-500">*</span></span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0d1738] border-cyan-400 ring-2 ring-cyan-500/30 text-white shadow-lg'
                          : 'bg-[#05070f] border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{pkg.name}</span>
                      <div className="text-right">
                        <span className="font-extrabold text-xs text-cyan-400 block">
                          {formatPrice(pkg.price)}
                        </span>
                        {pkg.oldPrice && (
                          <span className="text-[10px] text-slate-500 line-through">
                            {formatPrice(pkg.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Total Price */}
            <div className="bg-[#05070f] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-cyan-400 tracking-tight">
                    {formatPrice(currentPrice)}
                  </span>
                  {currentOldPrice > 0 && (
                    <span className="text-xs text-slate-500 line-through font-medium">
                      {formatPrice(currentOldPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 bg-[#090d1a] border border-slate-800 rounded-xl p-1.5">
                <span className="text-xs font-bold text-slate-400 px-2">Qty:</span>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 active:scale-95'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-950 active:scale-95'
                }`}
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
};
