import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';
import { Star, ShieldCheck, Zap, ShoppingCart, Check, Plus, Minus, ArrowLeft, Gamepad2 } from 'lucide-react';

export const ProductDetails = ({ products = [] }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && Array.isArray(product.packages) && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const unitPrice = selectedPackage ? selectedPackage.price : product.price;
  const oldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Back button */}
      <div className="pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to previous page
        </button>
      </div>

      {/* Main product showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0a0f1d] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Left image visual */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="h-80 w-full rounded-2xl shadow-xl" />

          {/* Badges */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 bg-[#060a14] p-3 rounded-xl border border-slate-800">
            <span className="text-cyan-400 flex items-center gap-1">
              <Gamepad2 className="w-4 h-4" /> {product.platform}
            </span>
            <span className="text-purple-400 uppercase tracking-widest">{product.type}</span>
            <span className="text-emerald-400">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.soldCount} sold)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{product.name}</h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Package / Variant selection if available */}
          {Array.isArray(product.packages) && product.packages.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-300">
                Select Package / Option <span className="text-cyan-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0e172e] border-cyan-500 text-white ring-1 ring-cyan-500/50 shadow-md shadow-cyan-950/50'
                          : 'bg-[#060a14] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold">{pkg.name}</span>
                      <span className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Total Price */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
                {oldPrice && (
                  <span className="text-xs text-slate-500 line-through">{formatPrice(oldPrice * quantity)}</span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-[#060a14] px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mr-1">Qty:</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold text-slate-100 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-cyan-950/40 hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Added Toast Notification */}
          {addedToast && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-between animate-fade-in">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Item added to shopping cart!
              </span>
              <Link to="/cart" className="underline hover:text-emerald-300">
                View Cart
              </Link>
            </div>
          )}

          {/* Guarantee info */}
          <div className="bg-[#060a14] p-4 rounded-xl border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Guaranteed original digital codes &amp; direct player ID top-ups with instant support in Kurdistan &amp; Iraq.</span>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h3 className="text-xl font-bold text-slate-100">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
