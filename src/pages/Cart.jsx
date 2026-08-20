import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  subtotal = 0
}) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto">
          Look through our store catalog to find top PUBG UC, Free Fire Diamonds, Steam Wallet codes, or blockbuster video games.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs md:text-sm shadow-xl shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Start Browsing Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital items before proceeding to checkout
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0d1322] border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-black text-cyan-400">DS</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-cyan-400 uppercase">
                      {item.platform}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm md:text-base mt-0.5">
                    {item.productName}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400">
                    Option: {item.packageName}
                  </p>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm md:text-base font-black text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="font-black text-slate-100 text-base uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-bold text-slate-100">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Digital Code Delivery:</span>
                <span className="font-bold text-emerald-400">FREE / Instant</span>
              </div>

              <div className="flex justify-between">
                <span>Currency:</span>
                <span className="font-bold text-cyan-400">IQD</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
                <span className="font-bold text-slate-200">Subtotal:</span>
                <span className="text-xl font-black text-cyan-400">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Manual payment via FastPay, Korek, & MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
