import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { Star, ShieldCheck, Zap, ShoppingCart, ArrowLeft, CheckCircle2, Clock, Info } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-orbitron font-extrabold text-2xl text-slate-200">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Package', price: product.price }];

  const currentPkg = selectedPackage || packages[0];
  const isOutOfStock = product.stock <= 0;
  const currentPrice = currentPkg.price;
  const totalPriceCalculated = currentPrice * quantity;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, currentPkg, quantity);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, currentPkg, quantity);
      navigate('/checkout');
    }
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-cyan-400 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span>/</span>
        <Link to="/products" className="hover:text-cyan-400">Store Catalog</Link>
        <span>/</span>
        <span className="text-cyan-400 line-clamp-1">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Image & Feature Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090e1f] border border-slate-800 rounded-2xl overflow-hidden p-2">
            <ProductImage
              image={product.image}
              name={product.name}
              platform={product.platform}
              category={product.category}
              alt={product.name}
              className="h-72 w-full rounded-xl"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800/80 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold block text-slate-100">100% Legitimate & Guaranteed</span>
                <span className="text-slate-500">Official digital code / direct account top-up</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold block text-slate-100">Instant Automated Processing</span>
                <span className="text-slate-500">Fast delivery via Kurdistan payment confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Configurator & Purchase */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-slate-900 text-cyan-400 border border-cyan-500/30">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.9'} Rating</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-slate-400">
                <span className="text-cyan-400 font-bold">{product.soldCount || 100}</span> Orders Completed
              </div>
              <span className="text-slate-600">|</span>
              <div className={isOutOfStock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Package / Denomination Selector */}
          <div className="space-y-3">
            <label className="font-orbitron font-bold text-xs uppercase tracking-wider text-slate-200 block">
              Select Package / Option:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = currentPkg.name === pkg.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 text-slate-100 shadow-md shadow-cyan-950/50'
                        : 'bg-[#090e1f] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-xs">{pkg.name}</span>
                    <span className="font-orbitron font-extrabold text-xs text-cyan-400">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Calculated Price */}
          <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-300 hover:text-white text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono font-bold text-cyan-400">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-slate-300 hover:text-white text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-3 border-t border-slate-800">
              <span className="font-orbitron font-bold text-xs text-slate-400 uppercase">Total Amount:</span>
              <span className="font-orbitron font-extrabold text-2xl text-cyan-400">
                {formatPrice(totalPriceCalculated)}
              </span>
            </div>
          </div>

          {/* Added message toast */}
          {addedMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Package successfully added to cart!</span>
            </div>
          )}

          {/* Purchase CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl border text-xs font-orbitron font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`py-3.5 px-4 rounded-xl text-xs font-orbitron font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Fast Info Note */}
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              For mobile game top-ups (e.g. PUBG, Free Fire, Mobile Legends), you will enter your Player ID during checkout. Delivery takes less than 5 minutes after payment confirmation via FastPay or Korek.
            </span>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <h3 className="font-orbitron font-extrabold text-xl text-white">
            Similar Products You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
