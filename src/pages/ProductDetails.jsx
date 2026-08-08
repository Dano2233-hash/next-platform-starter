import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, ShoppingCart, Zap, ArrowLeft, BadgeInfo } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      if (found.packages && found.packages.length > 0) {
        setSelectedPackage(found.packages[0]);
      } else {
        setSelectedPackage({ name: 'Standard Edition', price: found.price });
      }
      setQuantity(1);
    } else {
      setProduct(null);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h2 className="text-xl font-black text-white">Product Not Found</h2>
        <p className="text-xs text-white/50">The premium package or digital key catalog you visited does not exist.</p>
        <Link to="/products" className="inline-block px-4 py-2 bg-cyan-500 text-black font-bold rounded text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    onAddToCart(product, selectedPackage, quantity);
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    onAddToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column: Visual with overlay */}
        <div className="space-y-4">
          <div className="relative">
            <ProductImage
              src={product.image}
              name={product.name}
              category={product.category}
              platform={product.platform}
              className="h-64 sm:h-80 md:h-96 rounded-xl"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-xs">
                <span className="bg-red-500 text-white font-black uppercase text-sm px-4 py-2 rounded tracking-widest">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>

          {/* Secure Trust Badges */}
          <div className="bg-[#09090c] border border-white/5 p-4 rounded-xl grid grid-cols-2 gap-4">
            <div className="text-center space-y-1">
              <ShieldCheck className="h-5 w-5 text-cyan-400 mx-auto" />
              <h5 className="text-[10px] font-bold text-white uppercase tracking-wider">Secure Transfer</h5>
              <p className="text-[9px] text-white/40">100% legal digital certificates</p>
            </div>
            <div className="text-center space-y-1">
              <Star className="h-5 w-5 text-amber-400 mx-auto fill-amber-400/20" />
              <h5 className="text-[10px] font-bold text-white uppercase tracking-wider">Rating {product.rating.toFixed(1)}</h5>
              <p className="text-[9px] text-white/40">{product.soldCount}+ satisfied buyers</p>
            </div>
          </div>
        </div>

        {/* Right column: Specs and Packages */}
        <div className="space-y-6">
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded">
                {product.platform}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded">
                {product.type}
              </span>
              {product.tag && (
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-purple-600 px-2.5 py-1 rounded">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{product.name}</h1>
            <p className="text-xs text-white/60 leading-relaxed">{product.description}</p>
          </div>

          {/* Option / Packages Selector */}
          {product.packages && product.packages.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Choose Package / Options:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage && selectedPackage.name === pkg.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-lg border text-left flex flex-col justify-between gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'bg-[#09090c] border-white/5 hover:border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-cyan-400' : 'text-white/80'}`}>
                        {pkg.name}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400">
                        {formatPrice(pkg.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selection */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Select Quantity:</h4>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-white/10 text-white font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-6 font-extrabold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-white/10 text-white font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-white/40">
                In Stock: <span className="text-white font-bold">{product.stock} items</span>
              </div>
            </div>
          </div>

          {/* Pricing breakdown summary */}
          {selectedPackage && (
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 block font-semibold uppercase">Total Price</span>
                <span className="text-lg font-black text-cyan-400">
                  {formatPrice(selectedPackage.price * quantity)}
                </span>
              </div>
              <div className="text-right text-[10px] text-white/40 uppercase">
                <span>Fast & Safe delivery</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-3.5 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                  : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/10 active:scale-98'
              }`}
            >
              <Zap className="h-4.5 w-4.5 fill-black" />
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-3.5 rounded-lg font-black uppercase tracking-widest text-xs border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isOutOfStock
                  ? 'border-white/5 text-white/30 cursor-not-allowed bg-transparent'
                  : 'border-[#0066ff]/20 hover:border-cyan-500/30 bg-[#0066ff]/10 hover:bg-[#0066ff]/20 text-cyan-300 active:scale-98'
              }`}
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              Add To Cart
            </button>
          </div>

          {/* Safety disclaimer */}
          <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-start gap-2.5">
            <BadgeInfo className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-500/80 leading-relaxed">
              <strong>Notice:</strong> This is a digital delivery item. After purchasing, you will be generated a unique receipt ID. Connect with our official WhatsApp or Discord support to instantly activate the license or claim top-ups.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
