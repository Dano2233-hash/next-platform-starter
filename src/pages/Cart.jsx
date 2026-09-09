import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Cart = ({ cartItems, onUpdateQuantity, onRemove, onClear, totalAmount }) => {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-[#080d1a] border border-slate-800/80 rounded-3xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added any game codes, top-ups, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:text-black font-extrabold text-xs shadow-lg shadow-cyan-950/50"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review your selected digital items before proceeding to manual payment.
          </p>
        </div>

        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.cartKey}
              className="p-4 rounded-2xl bg-[#090d18] border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-cyan-400 text-xs">
                  {item.productPlatform || 'DS'}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{item.productName}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">{item.packageName}</p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Unit Price: {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                {/* Quantity Controls */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.cartKey, -1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2 text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartKey, 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right">
                  <span className="font-black text-white text-sm block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => onRemove(item.cartKey)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-[#080d1a] border border-slate-800/80 rounded-3xl p-6 space-y-5">
          <h2 className="font-extrabold text-white text-base pb-3 border-b border-slate-800">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Total Items</span>
              <span className="text-white font-semibold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Currency</span>
              <span className="text-white font-semibold">IQD</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-cyan-400 font-semibold">Free (Instant Digital)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-200">Total Amount</span>
            <span className="text-2xl font-black text-cyan-300">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 hover:text-black shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>FastPay, Korek & MasterCard Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};
