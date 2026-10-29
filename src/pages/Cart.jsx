import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Looks like you haven't added any games, top-ups, or digital gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-extrabold text-xs shadow-lg"
        >
          <Gamepad2 className="w-4 h-4" /> Explore Digital Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Review your digital items and packages before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
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
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-cyan-400 text-xs text-center shrink-0">
                  {item.platform || 'DS'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">{item.name}</h3>
                  {item.selectedPackage && (
                    <span className="inline-block text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-md mt-1">
                      {item.selectedPackage}
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mt-1">Instant Digital Delivery</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-100">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[100px]">
                  <span className="text-xs text-slate-500 block">Subtotal</span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1.5"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Summary</h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-slate-100">{totalCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
                <span className="font-extrabold text-white">Grand Total</span>
                <span className="font-black text-cyan-400 text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-slate-500 text-center">
              Safe & fast local Iraqi payments via FastPay, Korek, and MasterCard.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
