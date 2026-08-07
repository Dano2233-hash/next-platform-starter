import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Zap, HelpCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function ProductDetails({ products = [], onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);

  // Selected package (default to first one if present)
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      if (product.packages && product.packages.length > 0) {
        setSelectedPackage(product.packages[0]);
      } else {
        setSelectedPackage(null);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 bg-[#0a0a14] border border-slate-900 rounded-lg max-w-lg mx-auto">
        <h2 className="text-xl font-bold uppercase tracking-wider text-red-500 mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The product you are looking for might have been moved or deleted.</p>
        <Link to="/products" className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase rounded border border-slate-800">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Calculate prices
  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const isSale = product.oldPrice && product.oldPrice > currentPrice;
  const discountPercent = isSale
    ? Math.round(((product.oldPrice - currentPrice) / product.oldPrice) * 100)
    : 0;
  const isOutOfStock = product.stock <= 0;

  const handleQtyChange = (delta) => {
    const nextQty = quantity + delta;
    if (nextQty >= 1) {
      setQuantity(nextQty);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    alert(`${product.name} (${selectedPackage?.name || 'Standard'}) added to your cart!`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-cyan-400 uppercase tracking-widest transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#06060c] border border-slate-900 p-6 sm:p-10 rounded-2xl relative">

        {/* Left Side: Product Image & Fallback */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-800/80 shadow-2xl relative group bg-slate-950">
            <ProductImage product={product} />
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-900 flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-white uppercase">100% Legal</p>
                <p className="text-[9px] text-slate-400">Official Activations</p>
              </div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-900 flex items-center space-x-2.5">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-white uppercase">Fast Delivery</p>
                <p className="text-[9px] text-slate-400">Manual Processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration & Pricing */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Platform / Type labels */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded">
                {product.platform}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded">
                {product.type}
              </span>
              {isOutOfStock && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/20 px-2.5 py-1 rounded">
                  Out Of Stock
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
              {product.name}
            </h1>

            {/* Rating and Sold statistics */}
            <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 pb-2 border-b border-slate-900">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-slate-200">{product.rating.toFixed(1)} / 5.0</span>
              </div>
              <span>|</span>
              <div>
                <span>Sold Count: </span>
                <span className="text-cyan-400 font-extrabold">{product.soldCount} Customers</span>
              </div>
              <span>|</span>
              <div>
                <span>Availability: </span>
                <span className={isOutOfStock ? 'text-red-500 font-bold' : 'text-emerald-500 font-bold'}>
                  {isOutOfStock ? 'Out of stock' : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Packages Selector */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Select Package / Amount *</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all duration-200 select-none ${
                          isSelected
                            ? 'bg-[#00e5ff]/5 border-[#00e5ff] text-white shadow-[0_0_12px_rgba(0,229,255,0.15)] ring-1 ring-[#00e5ff]'
                            : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-slate-200 hover:border-slate-800'
                        }`}
                      >
                        <span className="text-xs font-extrabold tracking-tight line-clamp-1">
                          {pkg.name}
                        </span>
                        <span className="text-[11px] font-bold text-cyan-400 mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Row and Quantity Selector */}
          <div className="bg-[#080810] border border-slate-900 p-5 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Price display */}
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Grand Price</span>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-2xl font-black text-cyan-400">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {isSale && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(product.oldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col space-y-1 sm:items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Quantity</span>
                <div className="flex items-center space-x-2.5 bg-slate-950 border border-slate-900 rounded-lg p-1 w-fit mt-1">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white font-black text-sm transition-colors disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-white px-2.5 min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white font-black text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Main CTA buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white py-3.5 rounded-lg border border-slate-800 hover:border-slate-700 font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black py-3.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Buy Now (Instant Order)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
