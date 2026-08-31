import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export default function Cart({
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal = 0,
}) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Browse our catalog to add digital games, top-ups, gift cards, or subscriptions to your cart.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Store Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your items before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-950/40 hover:bg-red-950/80 px-3 py-1.5 rounded-xl border border-red-800/40 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.productImage ? (
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-black text-cyan-400 uppercase">
                      {item.productName?.substring(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.productName}</h3>
                  {item.packageItem && (
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                      {item.packageItem.name}
                    </p>
                  )}
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.platform} • {item.type}
                  </span>
                </div>
              </div>

              {/* Quantity, Subtotal, Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-bold text-xs text-cyan-300">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Subtotal</span>
                  <span className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-800 transition-all"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Summary Box */}
        <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800/90 p-6 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Digital Delivery Fee</span>
              <span className="font-bold text-emerald-400 uppercase">FREE</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Payment Processing</span>
              <span className="font-bold text-cyan-400">Manual Transfer</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Amount</span>
            <span className="text-2xl font-black text-white">{formatPrice(cartTotal)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Fast & Secure Processing
            </div>
            <p>Manual payment processing via FastPay, Korek, or MasterCard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
