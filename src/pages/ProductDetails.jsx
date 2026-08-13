import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Shield, ArrowLeft, Send } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductDetails({ products, onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-black text-white">Digital Product Not Found</h2>
        <p className="text-xs text-gray-400 mt-2">The product slug you requested is missing or has been deleted.</p>
        <Link to="/products" className="mt-4 inline-block rounded-lg bg-[#0066ff] px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-600">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Set initial selected package option
  const defaultPackage = product.packages && product.packages.length > 0 ? product.packages[0] : null;
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const priceToDisplay = selectedPackage ? selectedPackage.price : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const pkgToSubmit = selectedPackage || { name: 'Standard Edition', price: product.price };
    onAddToCart(product, pkgToSubmit, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const pkgToSubmit = selectedPackage || { name: 'Standard Edition', price: product.price };
    onAddToCart(product, pkgToSubmit, quantity);
    navigate('/checkout');
  };

  return (
    <div className="pb-16 text-left space-y-6">

      {/* Back button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition">
        <ArrowLeft size={14} />
        <span>Back to digital catalog</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Side: Media Cover */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#12121e] bg-[#0c0c14]">
          <ProductImage
            image={product.image}
            name={product.name}
            category={product.category}
            platform={product.platform}
            type={product.type}
            className="h-full w-full object-cover"
          />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
            <span className="rounded bg-[#050505]/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#00e5ff] border border-[#1e1e2d]">
              {product.platform}
            </span>
            <span className="rounded bg-[#0066ff]/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              {product.type}
            </span>
          </div>
        </div>

        {/* Right Side: Configuration & Buy triggers */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#7000ff] bg-[#7000ff]/10 px-2 py-0.5 rounded uppercase">
                {product.category} Section
              </span>
              <div className="flex items-center gap-1 text-xs">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span className="font-extrabold text-white">{product.rating}</span>
                <span className="text-gray-500">({product.soldCount} direct transfers)</span>
              </div>
            </div>

            <h1 className="text-2xl font-black uppercase text-white mt-2 tracking-wide sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-3 text-sm text-gray-400 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3 bg-black/20 rounded-xl p-4 border border-[#12121e]">
              <span className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Select Package Option:
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`rounded-xl border p-3 text-left transition ${
                      selectedPackage?.name === pkg.name
                        ? 'border-[#00e5ff] bg-[#0066ff]/10 ring-1 ring-[#00e5ff]'
                        : 'border-[#12121e] bg-[#0c0c14] hover:border-gray-700'
                    }`}
                  >
                    <span className="block text-xs font-black text-white">{pkg.name}</span>
                    <span className="block text-xs font-bold text-[#00e5ff] mt-1">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checkout Configurations */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between border-b border-[#12121e] pb-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Total Price (IQD)</span>
                <span className="text-2xl font-black text-[#00e5ff]">{formatPrice(priceToDisplay * quantity)}</span>
              </div>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Quantity Controller & Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-[#1e1e2d] bg-[#0c0c14] p-1.5 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 flex items-center justify-center rounded bg-transparent font-bold text-gray-400 hover:text-white"
                >
                  -
                </button>
                <span className="text-sm font-black w-8 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 flex items-center justify-center rounded bg-transparent font-bold text-gray-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <div className="flex-1 min-w-[200px] grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#1e1e2d] bg-transparent py-3 text-xs font-black text-gray-300 hover:bg-[#12121e] hover:text-white transition disabled:opacity-35 disabled:pointer-events-none"
                >
                  <ShoppingCart size={14} />
                  <span>Add To Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="rounded-xl bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] py-3 text-xs font-black uppercase text-white hover:opacity-95 transition shadow-lg premium-glow-blue disabled:opacity-35 disabled:pointer-events-none"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Secure details */}
          <div className="rounded-lg bg-[#07070d] border border-[#12121e] p-3 text-[11px] text-gray-500 flex gap-2 items-center">
            <Shield size={16} className="text-emerald-500 shrink-0" />
            <span>Digital Delivery is manually processed. Settle your payment via Korek or FastPay and complete your order smoothly.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
