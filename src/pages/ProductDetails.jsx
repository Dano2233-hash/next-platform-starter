import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, ShieldCheck, Check, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  // Find product by slug or id
  const product = products.find(p => p.slug === slug || p.id === slug);

  // Package state selection
  const [selectedPackage, setSelectedPackage] = useState(() => {
    return product && product.packages && product.packages.length > 0
      ? product.packages[0]
      : null;
  });

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-xs text-gray-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const unitPrice = selectedPackage ? selectedPackage.price : product.price;
  const oldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;
  const hasDiscount = oldPrice && oldPrice > unitPrice;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store Catalog</span>
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image / Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-[#090d18] border border-gray-800 p-2 overflow-hidden shadow-2xl">
            <ProductImage
              image={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              heightClass="h-72 md:h-96"
            />
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#090d18] border border-gray-800 flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="block font-bold text-white text-[11px]">100% Genuine</span>
                <span className="text-[10px] text-gray-400">Official digital code</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#090d18] border border-gray-800 flex items-center space-x-2.5">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="block font-bold text-white text-[11px]">Instant Delivery</span>
                <span className="text-[10px] text-gray-400">Fast local transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Specs & Buying Form */}
        <div className="lg:col-span-7 space-y-6 bg-[#090d18] p-6 md:p-8 rounded-3xl border border-gray-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40">
                {product.platform}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
              </div>
              <span>•</span>
              <span>{product.soldCount ? product.soldCount.toLocaleString() : '100+'} Orders Completed</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed border-t border-b border-gray-800/80 py-4">
            {product.description}
          </p>

          {/* Package Selection */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">
                Select Package / Amount:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950 to-purple-950 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-[#050811] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pkg.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-xs font-extrabold text-cyan-400 mt-1">
                        {formatPrice(pkg.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Quantity Box */}
          <div className="p-4 rounded-2xl bg-[#050811] border border-gray-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Total Price</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl md:text-3xl font-black text-white">
                    {formatPrice(unitPrice * quantity)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(oldPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-400">Qty:</span>
                <div className="flex items-center space-x-2 bg-[#090d18] border border-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-gray-800 text-white font-bold flex items-center justify-center hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-white px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-gray-800 text-white font-bold flex items-center justify-center hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Related Products"
          subtitle="Other popular items in this category"
          icon={Layers}
          products={relatedProducts}
        />
      )}
    </div>
  );
}
