import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Zap,
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  Package,
  Layers,
  Info
} from 'lucide-react';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
        <p className="text-sm text-slate-400">The requested item might have been removed or renamed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const packages = product.packages || [];
  const currentPackage = packages[selectedPkgIndex] || {
    name: 'Standard',
    price: product.price
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const unitPrice = currentPackage.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentPackage, quantity);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">

      {/* Back Button Breadcrumb */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store
        </button>
      </div>

      {/* Notice Banner */}
      {addedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Added {quantity}x ({currentPackage.name}) to your cart!</span>
          </div>
          <Link to="/cart" className="underline text-xs hover:text-white">
            View Cart & Checkout
          </Link>
        </div>
      )}

      {/* MAIN PRODUCT GRID DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Col: Image Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/80">
            <ProductImage
              src={product.image}
              alt={product.name}
              title={product.name}
              category={product.category}
              platform={product.platform}
              className="h-80 sm:h-96 w-full"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Dano Store Guarantee</span>
            </div>
            <p>
              100% genuine keys & instant player top-ups. Delivered directly after payment confirmation via FastPay, Korek, or MasterCard.
            </p>
          </div>
        </div>

        {/* Right Col: Info & Package Selection */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header Badges & Title */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600/90 text-white shadow-sm">
                {product.platform}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-slate-900 text-cyan-300 border border-cyan-500/30">
                {product.type}
              </span>
              {product.tag && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-300 border border-purple-500/30">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || '5.0'} Rating</span>
              </div>
              <span>•</span>
              <div>
                <strong className="text-slate-200">{product.soldCount ? product.soldCount.toLocaleString() : '1,200+'}</strong> sold
              </div>
              <span>•</span>
              <div>
                Status:{' '}
                {isOutOfStock ? (
                  <span className="text-red-400 font-bold">Out of Stock</span>
                ) : (
                  <span className="text-emerald-400 font-bold">In Stock ({product.stock})</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </div>

          {/* Package Selector */}
          {packages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" /> Select Package:
                </label>
                <span className="text-xs text-slate-400">{packages.length} options available</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {packages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold line-clamp-1">{pkg.name}</span>
                      <span className="text-xs font-extrabold text-cyan-400 mt-2">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Total Price Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400">Total Price</span>
                <div className="text-2xl font-black text-cyan-400 tracking-tight">
                  {formatPrice(totalPrice)}
                </div>
              </div>

              {/* Quantity counter */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400">Quantity:</span>
                <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-extrabold text-slate-100">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Instant Delivery Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-slate-300">
              <Layers className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Direct Activation Code / ID Transfer</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-slate-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Region: Iraq & Global Compatible</span>
            </div>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You May Also Like"
          subtitle="Similar games, top-ups, and gift cards"
          products={relatedProducts}
          viewAllLink="/products"
        />
      )}

    </div>
  );
};

export default ProductDetails;
