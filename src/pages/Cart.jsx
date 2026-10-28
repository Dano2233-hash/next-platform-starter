import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, totalItemCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          You haven't added any game top-ups or digital keys to your cart yet.
        </p>
        <Link to="/products" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-600/20">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before manual checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 sm:p-5 rounded-2xl bg-[#0a0f20] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 inline-block mb-1">
                  {item.platform} • {item.category}
                </span>
                <h3 className="font-bold text-slate-100 text-base">{item.name}</h3>
                <span className="text-xs text-slate-300 font-semibold mt-0.5 block">
                  Selected Package: <span className="text-cyan-300">{item.packageName}</span>
                </span>
                <span className="text-sm font-extrabold text-white mt-2 block">
                  {formatPrice(item.unitPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center bg-[#050814] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-slate-200">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <span className="text-[10px] text-slate-500 uppercase block">Subtotal</span>
                  <span className="text-base font-extrabold text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Browsing Catalog
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">Order Summary</h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Items Count ({totalItemCount})</span>
              <span>{totalItemCount} Units</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE (Instant Digital)</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Processing</span>
              <span className="text-amber-400 font-medium">Manual Transfer</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-baseline justify-between">
            <span className="font-bold text-slate-200 text-sm">Total Amount</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
