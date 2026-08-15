import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice.js';

export default function Cart({ cart, updateQuantity, removeFromCart, clearCart, cartTotal }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Looks like you haven't added any digital products, PUBG UC packages, or gift cards to your cart yet.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            <span>Explore Gaming Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-cyan-400" /> Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected gaming keys & packages</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table / Cards */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090e1c] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-cyan-400 text-base shrink-0">
                  {item.platform ? item.platform[0] : 'D'}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="text-cyan-400 font-semibold">{item.platform}</span>
                    {item.selectedPackage && (
                      <>
                        <span>•</span>
                        <span className="text-purple-300 font-semibold">Pkg: {item.selectedPackage}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <div className="text-[10px] text-slate-400">{formatPrice(item.price)} each</div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl sticky top-24">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Digital Code Delivery</span>
              <span className="font-semibold text-emerald-400 uppercase">FREE</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Payment Fee</span>
              <span className="font-semibold text-emerald-400 uppercase">0 IQD</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-200">Total Price</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-current" /> Proceed to Checkout
          </button>

          <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fast & Genuine Code Delivery
          </div>
        </div>
      </div>
    </div>
  );
}
