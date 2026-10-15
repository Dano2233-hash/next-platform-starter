import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-[#090d1a] border border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingCart className="w-10 h-10 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
            You haven't added any products to your cart yet. Explore our games, UC top-ups, and gift cards to get started!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Store Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-cyan-400" />
          <span>Shopping Cart</span>
        </h1>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center font-extrabold text-cyan-400 text-sm">
                  {item.image ? (
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{item.platform || 'DS'}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">{item.productName}</h3>
                  <span className="text-xs font-semibold text-cyan-400 block mb-1">
                    Option: {item.packageName}
                  </span>
                  <div className="text-sm font-extrabold text-slate-200">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>

              {/* Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800/80">
                <div className="flex items-center gap-2 bg-[#05070f] border border-slate-800 rounded-xl p-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-extrabold text-xs text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold flex items-center justify-center"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Subtotal</span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg bg-slate-900/50"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl sticky top-24">
            <h2 className="font-extrabold text-lg text-white border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Count</span>
                <span className="font-bold text-white">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE Instant Delivery</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-extrabold text-white">
                <span>Total IQD</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center border-t border-slate-800 pt-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Accepted: FastPay • Korek Cash • MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
