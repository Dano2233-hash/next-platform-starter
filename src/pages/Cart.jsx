import React from 'react';
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, CreditCard, Minus, Plus } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function Cart() {
  const { navigate } = useNavigation();
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.selectedPackage.name, item.quantity - 1);
    } else {
      removeFromCart(item.productId, item.selectedPackage.name);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.productId, item.selectedPackage.name, item.quantity + 1);
  };

  // Platform badges coloring
  const getPlatformStyle = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc': return 'bg-cyan-500/10 text-cyan-400';
      case 'xbox': return 'bg-emerald-500/10 text-emerald-400';
      case 'playstation': return 'bg-blue-500/10 text-blue-400';
      case 'mobile': return 'bg-amber-500/10 text-amber-400';
      case 'giftcard': return 'bg-purple-500/10 text-purple-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Shopping Cart
              <span className="text-xs font-bold text-brand-cyan bg-brand-blue/10 border border-brand-blue/30 px-2 py-0.5 rounded-full">
                {cartCount} Items
              </span>
            </h1>
            <p className="text-xs text-gray-500">Review selected packages before creating your manual order invoice.</p>
          </div>

          <button
            onClick={() => navigate('#/products')}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </button>
        </div>

        {/* Cart Contents */}
        {cart.length === 0 ? (
          <div className="py-20 text-center space-y-5 rounded-2xl border border-dashed border-brand-border/60 bg-[#0d0d15]/10 max-w-lg mx-auto">
            <ShoppingBag className="h-12 w-12 text-gray-600 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-white">Your Cart is Empty</h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore our game top-ups, subscriptions, and gift card vouchers to add items to your cart.
              </p>
            </div>
            <button
              onClick={() => navigate('#/products')}
              className="px-6 py-2.5 rounded-xl bg-brand-blue text-xs font-bold text-white uppercase tracking-widest shadow-md hover:bg-brand-blue/90 transition btn-glow"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* List of Cart Items */}
            <div className="lg:col-span-8 space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.selectedPackage.name}-${idx}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#0d0d15] border border-brand-border/60 hover:border-brand-blue/20 transition-all gap-4 animate-fade-in"
                >
                  {/* Basic Details */}
                  <div className="flex items-center gap-3.5">
                    <div className="h-14 w-14 rounded-lg bg-black/40 border border-white/5 flex-shrink-0 flex items-center justify-center font-bold text-brand-cyan tracking-wider text-sm">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${getPlatformStyle(item.platform)}`}>
                          {item.platform}
                        </span>
                        <span className="text-[9px] text-gray-500 uppercase">{item.type}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-brand-cyan font-bold mt-0.5">{item.selectedPackage.name}</p>
                    </div>
                  </div>

                  {/* Quantity and Actions Block */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    {/* Price helper */}
                    <div className="text-right sm:mr-4">
                      <p className="text-[10px] text-gray-500 uppercase">Unit Price</p>
                      <p className="text-xs font-bold text-gray-200">{formatPrice(item.selectedPackage.price)}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#050505] border border-brand-border/80 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="p-1.5 text-gray-400 hover:text-white rounded transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white min-w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="p-1.5 text-gray-400 hover:text-white rounded transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Total Price & Delete */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase">Total</p>
                        <p className="text-xs sm:text-sm font-black text-brand-cyan">
                          {formatPrice(item.selectedPackage.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.selectedPackage.name)}
                        className="p-2 text-gray-500 hover:text-red-400 border border-transparent hover:border-red-500/10 rounded-lg transition"
                        aria-label="Delete item"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}

              {/* Reset Cart Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="text-xs font-bold text-red-400 hover:text-red-300 transition"
                >
                  Clear Entire Cart
                </button>
              </div>

            </div>

            {/* Cart Summary & Checkout Actions */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0d0d15] border border-brand-border/80 space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Selected Options:</span>
                  <span className="font-bold text-gray-200">{cartCount} packages</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Processing:</span>
                  <span className="font-bold text-green-500">Free Manual Voucher</span>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-white uppercase">Invoice Amount</span>
                  <div className="text-xl sm:text-2xl font-black text-brand-cyan">
                    {formatPrice(cartTotal)}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('#/checkout')}
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20 hover:shadow-brand-blue/30 transition btn-glow flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <CreditCard className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="text-[10px] text-gray-500 leading-relaxed text-center">
                Payments are processed manually via FastPay, Korek, and MasterCard. Secure and protected orders.
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default Cart;
