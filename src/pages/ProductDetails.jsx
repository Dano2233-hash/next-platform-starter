import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Package,
  Plus,
  Minus,
  ArrowLeft,
  Check,
  Clock,
  HelpCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const product = getProductBySlug(slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [extraNote, setExtraNote] = useState('');

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else if (product) {
      setSelectedPackage({
        name: 'Standard Package',
        price: product.price,
        oldPrice: product.oldPrice
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The digital product you are looking for does not exist.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const currentOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity, extraNote);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity, extraNote);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96"
            />

            {/* Platform & Type Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-950/80 border border-slate-700 text-cyan-300 backdrop-blur-md">
                {product.platform || 'Digital'}
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                {product.type || 'Product'}
              </span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold block text-slate-100">100% Guaranteed</span>
                <span className="text-[10px] text-slate-400">Official digital code</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-bold block text-slate-100">Instant Delivery</span>
                <span className="text-[10px] text-slate-400">Fast order processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Package Selector & Pricing */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" /> {product.rating ? product.rating.toFixed(1) : '5.0'}
              </span>
              <span>•</span>
              <span>{product.soldCount || 0} Delivered</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 border-t border-slate-800 pt-5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Select Package / Quantity</span>
                <span className="text-cyan-400 font-semibold">{product.packages.length} Options Available</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage && selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-400 text-white ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs truncate">{pkg.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                      </div>
                      <div className="text-sm font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Player ID / Note Input if applicable */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Account ID / Player Tag (Required for Direct Top-Up)
            </label>
            <input
              type="text"
              value={extraNote}
              onChange={(e) => setExtraNote(e.target.value)}
              placeholder="e.g. PUBG Player ID (512345678) or Riot Tag"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Quantity & Total Price */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {currentOldPrice && (
                    <span className="line-through text-slate-500 text-sm">
                      {formatPrice(currentOldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Instant)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
