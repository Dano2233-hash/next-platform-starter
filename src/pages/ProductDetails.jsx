import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Zap, ShoppingCart, ArrowLeft, CheckCircle2, Clock, Smartphone, AlertTriangle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
  const { slug } = useParams();
  const { products, getProductBySlug } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = getProductBySlug(slug);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="font-heading font-bold text-2xl text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-xs"
        >
          Back to Products Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Back Link */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#090d1a] border border-slate-800/80 rounded-3xl p-6 sm:p-8">

        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="w-full h-80 sm:h-96 object-cover rounded-2xl"
          />

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Verified Digital Product
            </div>
            <p className="text-slate-400 leading-relaxed">
              Direct digital refill or original redeem key. Safe delivery to your player ID or registered account.
            </p>
          </div>
        </div>

        {/* Right Column: Information & Options */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-950 border border-slate-700 text-cyan-400">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-purple-950 border border-purple-800 text-purple-300">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-200">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {product.rating || 4.9} Stars
              </span>
              <span>•</span>
              <span>{product.soldCount || 1200}+ refills completed</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Package / Variant Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Package / Amount:
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
                          ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="block font-heading font-bold text-xs truncate">
                        {pkg.name}
                      </span>
                      <span className="block font-heading font-extrabold text-sm text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Quantity Box */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Price</span>
                <span className="font-heading font-black text-2xl text-cyan-400">
                  {formatPrice(currentPrice * quantity)}
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold">Qty:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-300 hover:text-white font-bold px-1"
                >
                  -
                </button>
                <span className="text-xs font-bold text-cyan-400 min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-300 hover:text-white font-bold px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 shadow-lg shadow-cyan-950/40'
                }`}
              >
                <Zap className="w-4 h-4 fill-slate-950" /> Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                <ShoppingCart className="w-4 h-4" /> Add To Cart
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="font-heading font-black text-xl text-white">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
