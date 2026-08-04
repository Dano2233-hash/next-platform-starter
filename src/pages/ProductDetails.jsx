import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products, onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [products, slug]);

  // Set the first package as default selected package (avoid top-level hook conditional error by placing hooks first!)
  const defaultPkg = product && product.packages && product.packages.length > 0
    ? product.packages[0]
    : { id: 'default', name: 'Standard', price: product ? product.price : 0 };

  const [selectedPackage, setSelectedPackage] = useState(defaultPkg);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-xl font-bold text-white uppercase">Product Not Found</h2>
        <p className="text-xs text-gray-400 mt-2">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-5 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] rounded-lg text-xs font-bold text-white transition-all cursor-pointer"
        >
          Back To Shop
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedPackage, quantity);
    alert(`${product.name} (${selectedPackage.name}) added to cart successfully!`);
  };

  const handleBuyNow = () => {
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer select-none bg-transparent border-0"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Main product wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0c0d12]/60 p-6 md:p-8 rounded-2xl border border-[#1a1e29] shadow-2xl relative">
        {/* Left column: image fallback & platforms */}
        <div className="lg:col-span-5 space-y-4">
          <ProductImage product={product} className="aspect-[16/10] md:aspect-[16/9] w-full rounded-xl" />

          <div className="p-4 rounded-xl bg-[#050505] border border-[#1a1e29] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <ShieldCheck className="text-[#00e5ff]" size={16} />
              DANO STORE PROMISE
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Safe, secure codes guaranteed. Instant receipt via digital chat. Direct support from our Kurdistan support staff.
            </p>
          </div>
        </div>

        {/* Right column: buy block */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-white bg-[#151824] px-2.5 py-1 rounded border border-[#1a1e29]">
                {product.platform}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#00e5ff] bg-[#00e5ff]/5 px-2.5 py-1 rounded border border-[#00e5ff]/20">
                {product.type}
              </span>
              {product.stock > 0 ? (
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/20">
                  IN STOCK
                </span>
              ) : (
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-red-400 bg-red-500/5 px-2.5 py-1 rounded border border-red-500/20">
                  OUT OF STOCK
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
              {product.name}
            </h1>

            {/* Rating / Sold count */}
            <div className="flex items-center gap-3.5 text-xs text-gray-400">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-gray-200">{product.rating} / 5</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-gray-300">{product.soldCount}+ Customers Served</span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-300 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Package Selector */}
            {product.packages && product.packages.length > 0 && (
              <div className="pt-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-300">
                  Choose Package Option:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0066ff]/10 border-[#0066ff] shadow-lg shadow-[#0066ff]/10'
                            : 'bg-[#050505] border-[#1a1e29] hover:border-gray-700'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{pkg.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Instant delivery</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-[#00e5ff]">{formatPrice(pkg.price)}</p>
                          {isSelected && <span className="text-[9px] font-bold text-[#00e5ff] block mt-0.5">Selected</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-4 flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-wider text-gray-300">Quantity:</span>
              <div className="flex items-center bg-[#050505] rounded-lg p-1.5 border border-[#1a1e29]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-0.5 text-xs text-gray-400 hover:text-white cursor-pointer font-bold bg-transparent border-0"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-0.5 text-xs text-gray-400 hover:text-white cursor-pointer font-bold bg-transparent border-0"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Buttons */}
          <div className="pt-6 border-t border-[#1a1e29] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#050505]/30 p-4 rounded-xl">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Total Price</p>
              <h2 className="text-xl font-black text-[#00e5ff] mt-0.5">
                {formatPrice(selectedPackage.price * quantity)}
              </h2>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#1a1e29] hover:bg-[#151824] text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer select-none bg-transparent ${
                  isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart size={15} />
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-xs font-black text-white transition-all cursor-pointer select-none shadow-lg shadow-[#0066ff]/25 ${
                  isOutOfStock ? 'bg-gray-800 text-gray-500 cursor-not-allowed hover:bg-gray-800' : ''
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
