import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, totalCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Your Cart is Currently Empty</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You haven't added any game top-ups, activation codes, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-500 transition-all"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your digital items before proceeding to checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 bg-[#0a0f24] border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center">
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-cyan-400">{item.product.platform}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{item.product.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400">{item.package.name}</p>
                  <p className="text-sm font-black text-white">{formatPrice(item.price)}</p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-slate-500 hover:text-red-400 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-[#0a0f24] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total ({totalCount}):</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span className="font-bold text-emerald-400">FREE (Instant Digital)</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Grand Total:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Manual payment via FastPay, Korek, or MasterCard</span>
          </div>
        </div>

      </div>

    </div>
  );
}
