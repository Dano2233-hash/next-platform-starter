import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export default function Cart({ cart = [], onRemove, onUpdateQuantity, onClearCart, totalPrice = 0 }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-12 bg-[#090e1a] border border-slate-800 rounded-3xl p-12 text-center space-y-5 shadow-xl">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any games, top-ups, or gift cards yet. Explore our store catalog for instant digital codes.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-950/40 hover:from-blue-500 hover:to-cyan-500 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceed to checkout
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 transition-colors cursor-pointer"
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
              key={item.cartItemId}
              className="bg-[#090e1a] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 shrink-0 overflow-hidden flex items-center justify-center font-black text-cyan-400 text-sm">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    item.name.substring(0, 2).toUpperCase()
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase bg-slate-900 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-cyan-300 font-medium">{item.packageName}</p>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-semibold block">Unit Price</span>
                  <span className="text-sm font-black text-slate-200">{formatPrice(item.price)}</span>
                </div>

                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-black text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-[10px] text-slate-500 font-semibold block">Subtotal</span>
                  <span className="text-sm font-black text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                </div>

                <button
                  onClick={() => onRemove(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#090e1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
          <h2 className="text-lg font-black text-white pb-3 border-b border-slate-800">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between text-slate-400">
              <span>Items Subtotal:</span>
              <span className="text-slate-200 font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Digital Delivery Fee:</span>
              <span className="text-emerald-400 font-bold">FREE (Instant)</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-black text-white">
              <span>Total Amount:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/40 transition-all cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>FastPay, Korek & MasterCard Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Manual verification via WhatsApp after checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
