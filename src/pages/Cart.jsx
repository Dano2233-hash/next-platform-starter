import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-5 max-w-xl mx-auto my-12 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Explore our vast catalog of PUBG UC top-ups, Steam paid games, PSN/Xbox cards, and subscriptions.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-mono uppercase">Shopping Cart</h1>
            <p className="text-xs text-slate-400">Review your gaming items before proceeding</p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.key}
              className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.packageName}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.platform}</span>
                  </div>
                  <p className="text-xs font-extrabold text-white mt-1">
                    {formatPrice(item.unitPrice)}
                  </p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-2 bg-[#050814] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.key, -1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-extrabold text-xs text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
                  <span className="text-sm font-black text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.key)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800 font-mono">
            Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Items Total</span>
              <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Digital Delivery Fee</span>
              <span className="text-green-400 font-bold">FREE Instant</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-base font-extrabold text-white">
              <span>Total Price</span>
              <span className="text-cyan-400 font-mono">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Accepted Local Payments</span>
            </div>
            <p>FastPay Wallet, Korek Cash, or MasterCard / FIB Card.</p>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/products"
            className="block text-center text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
