import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';

export function Cart({ cartItems = [], onUpdateQty, onRemove, onClearCart, totalPrice }) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto py-12">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Looks like you haven't added any game codes or top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg cursor-pointer inline-flex items-center gap-2"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400">
            Review your selected digital packages before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-600/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-950">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    category={item.category}
                    platform={item.platform}
                    heightClass="h-20"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-2 py-0.5 rounded font-bold">
                      {item.platform}
                    </span>
                    <span>Package: <strong className="text-slate-200">{item.packageName}</strong></span>
                  </div>
                  <span className="text-sm font-extrabold text-cyan-400 block sm:hidden mt-2">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                <span className="text-base font-black text-cyan-400 hidden sm:block">
                  {formatPrice(item.price)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg text-xs font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black w-6 text-center text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-white w-24 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => onRemove(item.cartItemId)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Side Card */}
        <div className="lg:col-span-4 bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-24">
          <h2 className="text-lg font-black text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total Items ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
              <span className="text-slate-200 font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE (Digital)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Processing</span>
              <span className="text-cyan-400 font-bold">FastPay / Korek / MC</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black">
              <span className="text-white">Total Amount</span>
              <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black text-sm py-4 rounded-xl shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
          >
            <Zap className="w-4 h-4" />
            <span>Proceed to Checkout</span>
          </button>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Secure Checkout & Fast Delivery across Iraq.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
