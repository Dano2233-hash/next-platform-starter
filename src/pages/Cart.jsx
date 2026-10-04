import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="font-heading text-2xl font-black text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore our wide range of paid games, mobile top-ups, gift cards, and subscriptions.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected digital items and packages before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-950/40 border border-red-900/40 px-3 py-1.5 rounded-xl"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 relative"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800 w-full sm:w-20">
                <ProductImage product={item.product || item} className="h-full w-full" />
              </div>

              <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left w-full">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 px-1.5 py-0.5 rounded">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-purple-300 bg-purple-950/80 border border-purple-800/50 px-1.5 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-100 truncate">{item.name}</h3>
                <p className="text-xs text-slate-400">Unit Price: {formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                {/* Quantity Control */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-slate-200">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="font-black text-sm text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Count</span>
                <span className="font-bold text-slate-200">{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE (Instant)</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-slate-200 text-sm">Total Amount</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>FastPay, Korek, and MasterCard accepted. Zero processing fee.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
