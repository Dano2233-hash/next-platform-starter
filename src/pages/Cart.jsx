import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">Shopping Cart</h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#080c19] border border-slate-800/80 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
            <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-200">Your Cart is Empty</h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Looks like you haven't added any game keys, PUBG UC, or gift cards to your cart yet.
            </p>
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors inline-block"
            >
              Explore Digital Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                      <span>{item.platform}</span>
                      <span>•</span>
                      <span>{item.packageName}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{item.name}</h3>
                    <p className="text-sm font-extrabold text-cyan-400">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-slate-100 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-500 uppercase">Subtotal</span>
                      <span className="text-sm font-extrabold text-slate-100">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order Summary Sidebox */}
            <div className="lg:col-span-4 bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 space-y-5">
              <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Digital Service Fee</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax</span>
                  <span>0 IQD</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold text-slate-100">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Manual Payment: FastPay, Korek, MasterCard</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
