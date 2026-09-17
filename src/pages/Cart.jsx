import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, ArrowLeft, RefreshCw } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotalPrice, totalItemsCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white font-sans">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400">
            Looks like you haven't added any digital games, PUBG UC, gift cards, or subscriptions yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>Start Shopping Now</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your items and proceed to fast local payment checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 px-3 py-1.5 rounded-xl transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#080d1a] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all shadow-lg"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                    {item.platform}
                  </span>
                  <h3 className="font-bold text-white text-base line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-slate-400">Option: <span className="text-cyan-300 font-semibold">{item.packageName}</span></p>
                  <p className="text-xs font-bold text-slate-200">{formatPrice(item.price)} each</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                {/* Quantity */}
                <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xl overflow-hidden text-xs">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="px-2.5 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-extrabold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="px-2.5 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Subtotal</span>
                    <span className="text-base font-black text-cyan-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-black text-white font-sans border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Selected Items</span>
              <span className="font-bold text-slate-200">{totalItemsCount}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Digital Processing Fee</span>
              <span className="text-emerald-400 font-bold">0 IQD (FREE)</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Grand Total</span>
              <span className="text-2xl font-black text-cyan-300">{formatPrice(cartTotalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Proceed to Manual Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 text-[11px] text-slate-400">
            <p className="font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Supported Payment Methods:</span>
            </p>
            <p className="text-slate-400 pl-5">FastPay, Korek Direct Transfer &amp; MasterCard</p>
          </div>
        </div>

      </div>

    </div>
  );
}
