import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400">Explore games, mobile top-ups, gift cards, and subscriptions in our store.</p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your items before proceeding to checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 shrink-0">
                  <ProductImage product={item.product} className="h-20" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-slate-100 text-sm truncate">
                    {item.product.name}
                  </h3>
                  {item.packageItem && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 text-[11px] font-semibold">
                      Package: {item.packageItem.name}
                    </span>
                  )}
                  <div className="text-xs text-cyan-400 font-bold mt-1">
                    {formatPrice(item.price)} each
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-slate-500 hover:text-rose-400 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 h-fit">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Items:</span>
              <span className="font-bold text-slate-100">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Fee:</span>
              <span className="font-bold text-emerald-400">FREE (Digital Instant)</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
              <span className="font-bold text-slate-200">Total Amount:</span>
              <span className="font-black text-cyan-400 text-lg">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Proceed to Checkout</span>
          </button>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Manual Transfer via FastPay, Korek, or MasterCard supported</span>
          </div>
        </div>

      </div>

    </div>
  );
}
