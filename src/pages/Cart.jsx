import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cartTotal = 0,
}) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Looks like you haven't added any games or top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#0b101c] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <ProductImage
                  product={{
                    name: item.name,
                    image: item.image,
                    platform: item.platform,
                    category: item.category,
                  }}
                  className="w-16 h-16 rounded-xl shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{item.packageName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.platform}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                <div className="flex items-center gap-2 bg-[#080d17] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 text-slate-300 font-bold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white px-2 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 text-slate-300 font-bold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {formatPrice(item.unitPrice)} each
                  </p>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>Items Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-semibold">FREE (Instant Digital)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Currency</span>
              <span className="font-semibold text-slate-200">IQD</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
            <span className="text-sm font-bold text-white">Total Amount</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-950/60 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
