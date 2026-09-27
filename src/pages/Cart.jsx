import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cart, updateQuantity, removeFromCart, clearCart, cartTotal }) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-5 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-slate-400 text-sm mt-1">
            Explore our game keys, mobile game top-ups, and gift cards to add items to your cart.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30"
        >
          <span>Browse Full Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            You have {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center font-extrabold text-cyan-400 text-sm">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-600/40 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-slate-400">
                    Option: <strong className="text-slate-200 font-semibold">{item.packageName}</strong>
                  </p>
                  <span className="text-sm font-black text-cyan-400 block sm:hidden">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-extrabold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal Item Price */}
                <span className="text-base font-black text-cyan-400 hidden sm:block w-28 text-right">
                  {formatPrice(item.price * item.quantity)}
                </span>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24 shadow-xl">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
              Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">Instant (0 IQD)</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-xs hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 uppercase tracking-wider"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Direct Manual Payment via FastPay, Korek & MasterCard</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
