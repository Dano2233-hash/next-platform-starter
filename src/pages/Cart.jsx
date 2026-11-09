import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, originalTotal, totalSavings, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-white font-heading">Your cart is currently empty</h2>
        <p className="text-xs text-slate-400">
          Looks like you haven't added any games, top-ups, or subscriptions yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
        >
          <span>Browse Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading tracking-wide">
            SHOPPING CART
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceeding to manual checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Cart items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 sm:p-5 rounded-2xl bg-[#090d1c] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {item.platform}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-800 text-slate-300">
                    {item.type}
                  </span>
                </div>
                <Link
                  to={`/product/${item.slug}`}
                  className="font-bold text-white text-base hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-slate-400 mt-0.5">
                  Package: <span className="text-cyan-300 font-semibold">{item.selectedPackage.name}</span>
                </p>
                <div className="mt-2 text-xs text-slate-400">
                  Unit Price: <span className="font-semibold text-white">{formatPrice(item.unitPrice)}</span>
                </div>
              </div>

              {/* Quantity Controls & Total for this line */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-white px-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <span className="text-base font-black text-cyan-400 font-heading block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  {item.unitOldPrice > item.unitPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(item.unitOldPrice * item.quantity)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/5 space-y-5 sticky top-28 shadow-xl">
            <h3 className="text-base font-bold text-white font-heading">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Items Count:</span>
                <span className="font-bold text-white">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Original Total:</span>
                <span>{formatPrice(originalTotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-rose-400 font-semibold">
                  <span>Discount Savings:</span>
                  <span>- {formatPrice(totalSavings)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Delivery Fee:</span>
                <span className="text-emerald-400 font-bold uppercase">Free (Digital)</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-semibold text-slate-300">Total IQD:</span>
              <span className="text-2xl font-black text-cyan-400 font-heading">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Proceed to Manual Checkout</span>
            </button>

            <div className="pt-2 text-[11px] text-slate-400 text-center leading-relaxed">
              Manual payment supported via FastPay, Korek, and MasterCard.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
