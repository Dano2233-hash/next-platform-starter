import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#090e1d] border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Looks like you haven't added any games or top-ups yet. Explore our wide collection of digital products.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-950/40"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Shopping Cart</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {totalItemsCount} items
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before proceeding to checkout.</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-[#090e1d] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0d1633] text-cyan-400 font-bold text-xs">
                      DS
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      {item.platform}
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <Link to={`/products/${item.slug}`} className="font-bold text-white hover:text-cyan-400 transition-colors text-sm">
                    {item.name}
                  </Link>
                  {item.packageName && (
                    <span className="text-xs text-cyan-400 block font-medium mt-0.5">
                      {item.packageName}
                    </span>
                  )}
                  <span className="text-xs font-bold text-white mt-1 block">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Total for this item */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center gap-2 bg-[#05070f] border border-slate-700/80 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-extrabold text-white px-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-black text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] text-slate-500 hover:text-red-400 flex items-center gap-1 justify-end ml-auto mt-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Processing</span>
                <span className="text-emerald-400 font-semibold">Free / 0 IQD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Manual Verification</span>
                <span className="text-cyan-400 font-semibold">Instant Local</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Grand Total</span>
                <span className="text-2xl font-black text-cyan-400">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs tracking-wide transition-all shadow-xl shadow-cyan-950/40 flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Payments via FastPay, Korek, and MasterCard.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
