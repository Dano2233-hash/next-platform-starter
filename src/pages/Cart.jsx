import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#080d1f] border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital items before completing purchase
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 font-semibold px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#080d1f] border border-slate-800 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your cart is currently empty</h3>
            <p className="text-xs text-slate-400">Discover games, gift cards, and mobile top-ups in our catalog.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Browse Products Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cart List */}
          <div className="lg:col-span-8 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#080d1e] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                    <p className="text-xs font-semibold text-cyan-400 mt-0.5">{item.packageName}</p>
                    <span className="text-xs text-slate-400 font-semibold mt-1 block">
                      {formatPrice(item.unitPrice)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto space-x-4 border-t sm:border-t-0 border-slate-800/60 pt-3 sm:pt-0">
                  <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-black text-cyan-400 min-w-24 text-right">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Summary</h3>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Items Count</span>
                <span className="text-white font-semibold">{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-3 border-t border-slate-800">
                <span>Total (IQD)</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:opacity-95 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Checkout Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>FastPay, Korek, & MasterCard</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
