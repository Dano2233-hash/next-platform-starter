import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 px-4 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Looks like you haven't added any games, mobile top-ups, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-400 transition-all"
        >
          <span>Explore Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart ({totalItems})
          </h1>
          <p className="text-slate-400 text-xs mt-1">Review your digital items before proceeding to checkout.</p>
        </div>

        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors p-2 rounded-lg bg-rose-950/20 border border-rose-900/30"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-slate-950 flex-shrink-0 overflow-hidden border border-slate-800">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs text-cyan-400 bg-slate-900">
                      DS
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    {item.product.platform} • {item.product.type}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm truncate">
                    {item.product.name}
                  </h3>
                  {item.selectedPackage && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Selected: <span className="text-slate-200 font-semibold">{item.selectedPackage.name}</span>
                    </p>
                  )}
                  <div className="text-sm font-extrabold text-cyan-400 mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>

              {/* Controls & Item Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 border-slate-800 pt-3 sm:pt-0">
                {/* Quantity */}
                <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right">
                  <div className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-400 transition-colors mt-0.5 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Items Total ({totalItems})</span>
              <span className="font-bold text-slate-100">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Delivery Fee</span>
              <span className="font-bold text-emerald-400">FREE (Digital)</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-extrabold text-white">
              <span>Grand Total</span>
              <span className="text-lg font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Code Delivery 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>100% Genuine Official Codes</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
