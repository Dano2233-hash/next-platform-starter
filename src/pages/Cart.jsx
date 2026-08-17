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
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal,
}) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
        <div className="p-6 rounded-full bg-slate-900 border border-slate-800 text-slate-600">
          <ShoppingBag className="w-16 h-16 text-cyan-500/50" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Looks like you haven't added any game codes, PUBG UC, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Store Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected digital items and packages</p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 uppercase">
                    {item.type || 'Digital'}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mt-1.5 truncate">
                  {item.productName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Package: <span className="text-slate-200 font-semibold">{item.packageName}</span>
                </p>
                <p className="text-sm font-extrabold text-cyan-300 mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* Quantity Toggles */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Subtotal</span>
                  <span className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">Order Summary</h3>

          <div className="space-y-3 text-xs text-slate-300 border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Items</span>
              <span className="font-bold text-white">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Digital Delivery</span>
              <span className="text-emerald-400 font-bold">Free Instant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Currency</span>
              <span className="font-bold text-cyan-400">IQD Only</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between text-base">
            <span className="font-bold text-white">Total Amount</span>
            <span className="text-2xl font-black text-cyan-300">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-black text-sm hover:brightness-110 shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pay safely with FastPay, Korek, or MasterCard in Iraq.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
