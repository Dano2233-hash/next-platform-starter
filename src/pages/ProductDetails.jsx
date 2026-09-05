import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check, ShieldCheck, ArrowLeft, Plus, Minus, PackageCheck, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(() => {
    if (product && product.packages && product.packages.length > 0) {
      return product.packages[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-2xl font-black text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400 max-w-md">
          The item you are looking for does not exist or has been removed from the store catalog.
        </p>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-cyan-600 text-slate-950 font-bold text-xs">
          Return to Products Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  // Active Price
  const activePrice = selectedPackage ? selectedPackage.price : product.price;
  const activeOldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

  let discountPercent = 0;
  if (activeOldPrice && activeOldPrice > activePrice) {
    discountPercent = Math.round(((activeOldPrice - activePrice) / activeOldPrice) * 100);
  }

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Image Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-2 shadow-2xl">
            <ProductImage
              product={product}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> 100% Genuine Digital Code
            </div>
            <p className="text-slate-400">
              Purchased items are digitally verified and manually delivered immediately after payment confirmation.
            </p>
          </div>
        </div>

        {/* Right Column: Product Details & Buying Section */}
        <div className="lg:col-span-7 space-y-6">

          <div className="space-y-3">
            {/* Platform & Category Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                {product.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-800">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>

            {/* Rating & Stock status */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'} / 5.0</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-medium">{product.soldCount || 0} Orders Completed</span>
              <span className="text-slate-500">•</span>
              {isOutOfStock ? (
                <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                  Out of Stock
                </span>
              ) : (
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  In Stock ({product.stock} available)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs leading-relaxed">
            <h4 className="font-bold text-slate-200 mb-1">Product Details</h4>
            <p>{product.description}</p>
          </div>

          {/* Package Selector if packages exist */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider">
                Select Package / Option *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <p className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {pkg.name}
                      </p>
                      <p className="text-xs font-black text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Bar */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Unit Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-cyan-400">
                    {formatPrice(activePrice)}
                  </span>
                  {activeOldPrice && activeOldPrice > activePrice && (
                    <span className="text-sm text-slate-500 line-through font-medium">
                      {formatPrice(activeOldPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-black text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-800">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-extrabold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price summary */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Order Subtotal:</span>
              <span className="text-base text-cyan-300 font-extrabold">
                {formatPrice(activePrice * quantity)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-cyan-400" /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20'
                }`}
              >
                <Zap className="w-4 h-4 fill-white" /> Buy Now
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
