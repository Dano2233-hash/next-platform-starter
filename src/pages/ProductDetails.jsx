import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { ProductSection } from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import { Star, ShieldCheck, Zap, ArrowLeft, ShoppingBag, CheckCircle, PackageCheck, Headphones, Smartphone } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The digital product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const packages = product.packages && product.packages.length > 0
    ? product.packages
    : [{ name: 'Standard Package', price: product.price }];

  const currentPackage = packages[selectedPackageIndex] || packages[0];
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, 1);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, 1);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image / Visual */}
        <div className="lg:col-span-5 relative aspect-[16/11] rounded-2xl overflow-hidden border border-slate-800 bg-[#070b18] shadow-2xl">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            platform={product.platform}
          />

          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950/80 text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
              {product.platform}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950/80 text-purple-300 border border-purple-500/40 backdrop-blur-md">
              {product.type}
            </span>
          </div>
        </div>

        {/* Right Column: Details & Package Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" /> {product.rating || '4.9'}
              </span>
              <span>•</span>
              <span>{product.soldCount || 100}+ Satisfied Customers</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Direct Digital Code
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Package Selection */}
          <div className="space-y-3 bg-[#0a0f20] border border-slate-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Select Package / Amount</span>
              <span className="text-cyan-400 font-normal">
                {packages.length} Option{packages.length > 1 ? 's' : ''} Available
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-900/40 to-cyan-950/60 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                        : 'bg-[#060a17] border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-white block">{pkg.name}</span>
                      <span className="text-xs font-extrabold text-cyan-400 mt-0.5 block">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-cyan-400 bg-cyan-400 text-[#070b18]' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Stock Summary */}
          <div className="p-5 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Price</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {formatPrice(currentPackage.price)}
                </span>
              </div>
              <div>
                {isOutOfStock ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800">
                    Out of Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5" /> In Stock ({product.stock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-xs border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" /> Add to Shopping Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                Instant Buy Now
              </button>
            </div>
          </div>

          {/* Security & Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#050814] border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>100% Genuine Digital Code Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#050814] border border-slate-800">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Instant WhatsApp & Discord Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#050814] border border-slate-800">
              <Headphones className="w-5 h-5 text-purple-400 shrink-0" />
              <span>24/7 Local Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Digital Products"
          subtitle="More items from the same category"
          products={relatedProducts}
          linkTo={`/products?category=${product.category}`}
        />
      )}
    </div>
  );
}
