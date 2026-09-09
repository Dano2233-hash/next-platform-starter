import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Info,
  Clock,
  Layers,
} from 'lucide-react';

export const ProductDetails = ({ products, onAddToCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage({
          id: product.id,
          name: 'Standard Package',
          price: product.price,
          oldPrice: product.oldPrice,
        });
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-8 bg-[#080d1a] border border-slate-800 rounded-3xl text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedPackage, quantity);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedPackage, quantity);
    }
    navigate('/cart');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Product Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-slate-800 bg-[#080d1a]">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              platform={product.platform}
              className="w-full h-full"
            />
          </div>

          {/* Guarantees Box */}
          <div className="p-4 rounded-2xl bg-[#090d18] border border-slate-800/80 space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-200">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Code / Top-Up Refill</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>100% Official & Legal Product</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>24/7 Automated Order Processing</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6 bg-[#080d1a] border border-slate-800/80 rounded-3xl p-6 sm:p-8">

          {/* Header & Category Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {product.platform}
              </span>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 5.0}</span>
              </div>
              <span>|</span>
              <span>{product.soldCount ? `${product.soldCount}+ Orders Completed` : 'In Stock'}</span>
              <span>|</span>
              <span className="text-cyan-400 font-semibold">Stock: {product.stock}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package / Option
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 text-white shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{pkg.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="font-extrabold text-cyan-300 text-sm mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Summary & Quantity */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-300">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOldPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(currentOldPrice * quantity)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Qty:</span>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-extrabold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
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
              disabled={product.stock <= 0}
              className="py-3 px-4 rounded-xl text-xs font-extrabold bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="py-3 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 hover:text-black transition-all shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>

          {addedNotice && (
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs text-center font-bold animate-fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Product successfully added to your cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
