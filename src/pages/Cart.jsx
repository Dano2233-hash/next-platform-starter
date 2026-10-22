import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full">

        {/* Title Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-cyan-400" />
              <span>Shopping Cart</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review your digital items, package choices, and proceed to payment.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Your shopping cart is empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add games, PUBG UC, gift cards or subscriptions to your cart to continue.
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20"
            >
              Browse Products Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2">
                <span>Selected Items ({cart.length})</span>
                <button
                  onClick={clearCart}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          item.platform
                        )}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-100 line-clamp-1">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {item.platform}
                          </span>
                          {item.selectedPackage && (
                            <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                              Pkg: {item.selectedPackage.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-slate-400 hover:text-slate-100 font-extrabold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-extrabold text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-slate-400 hover:text-slate-100 font-extrabold text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block font-medium">Subtotal</span>
                        <span className="text-sm font-black text-cyan-300">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Products Subtotal</span>
                    <span className="font-bold text-slate-200">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-emerald-400">FREE Digital Delivery</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-100">Total Amount</span>
                  <span className="text-xl font-black text-cyan-300">{formatPrice(getCartTotal())}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
                >
                  <span>Proceed To Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Security info card */}
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <p>Manual payment processing via FastPay, Korek, and MasterCard. 100% safe & verified.</p>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
