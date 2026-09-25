import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Explore our vast catalog of game top-ups, Steam codes, and digital gift cards to fill your cart.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/50"
        >
          <span>Explore Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-0.5">Review your digital items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center font-extrabold text-cyan-400 text-sm">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    item.name.slice(0, 3).toUpperCase()
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-100 text-sm truncate">{item.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 rounded">
                      Package: {item.packageName}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900 text-slate-400 border border-slate-800 rounded">
                      {item.platform}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-[#05070f] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-extrabold text-xs text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="font-black text-sm text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {formatPrice(item.price)} each
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24 space-y-4">
            <h3 className="font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items</span>
                <span className="font-semibold text-slate-200">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charge</span>
                <span className="font-semibold text-emerald-400">FREE Instant Code</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-slate-100 text-sm">Total Amount</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-[#05070f] border border-slate-800 rounded-xl flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Accepted Local Payments: FastPay, Korek, MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
