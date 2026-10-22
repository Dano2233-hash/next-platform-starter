import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, ShoppingCart, Check, Layers, ArrowLeft, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductImage } from '../components/ProductImage';
import { ProductSection } from '../components/ProductSection';
import { formatPrice } from '../utils/formatPrice';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Find product by id or slug
  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product?.packages && product.packages.length > 0) {
      setSelectedPackage(product.packages[0]);
    } else {
      setSelectedPackage(null);
    }
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-200">Product Not Found</h2>
          <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
          <Link to="/products" className="inline-block px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl">
            Back to Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedPackage ? selectedPackage.price : product.price;
  const totalPrice = currentPrice * quantity;
  const isOutOfStock = product.stock <= 0;

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

  // Related products from same category/platform
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1 w-full">

        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>

        {/* Toast Alert */}
        {addedToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Added to your cart successfully!</span>
            </div>
            <Link to="/cart" className="underline hover:text-white">
              View Cart & Checkout
            </Link>
          </div>
        )}

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

          {/* Left Column: Image & Feature Badges */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <ProductImage product={product} heightClass="h-72 sm:h-96" />
            </div>

            {/* Quick Guarantees Row */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-300 block">Instant Delivery</span>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-300 block">100% Verified</span>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-300 block">Iraq Region</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Package Selection & Buy Controls */}
          <div className="space-y-6">

            {/* Title & Ratings */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  {product.platform}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  {product.type}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating || '4.9'} Rating</span>
                </div>
                <span>•</span>
                <span className="text-cyan-400 font-semibold">
                  {product.soldCount ? `${product.soldCount.toLocaleString()} Sold` : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              {product.description}
            </p>

            {/* Package Selector (if packages exist) */}
            {product.packages && product.packages.length > 0 && (
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Select Package Option</span>
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
                            ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                      >
                        <span className="font-extrabold text-xs text-slate-100 block">{pkg.name}</span>
                        <span className="text-xs font-black text-cyan-300 block mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Quantity</label>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 font-black text-slate-300 hover:text-cyan-400 text-sm"
                >
                  -
                </button>
                <span className="px-3 font-extrabold text-xs text-slate-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 font-black text-slate-300 hover:text-cyan-400 text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Total Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Total Price</span>
                <span className="text-2xl font-black text-cyan-300">{formatPrice(totalPrice)}</span>
              </div>
              {selectedPackage && (
                <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  {selectedPackage.name}
                </span>
              )}
            </div>

            {/* Buy / Add to Cart Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <ProductSection
            title="You Might Also Like"
            subtitle="Similar digital products and packages"
            badgeText="Related Items"
            products={relatedProducts}
            maxItems={4}
          />
        )}

      </main>

      <Footer />
    </div>
  );
};
