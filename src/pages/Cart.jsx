import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart, cartTotal = 0 }) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          You have no items in your cart yet. Explore our gaming catalog to find top-ups, paid Steam keys, gift cards, or subscriptions!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/20"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-slate-400 text-xs mt-1">
            Review your items before completing your manual payment order.
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Entire Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.key}
              className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-cyan-400">
                  {item.productImage ? (
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    item.platform || 'DS'
                  )}
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base truncate">
                    {item.productName}
                  </h3>
                  {item.package && (
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                      Package: {item.package.name}
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-slate-300 mt-1 block">
                    {formatPrice(item.unitPrice)} each
                  </span>
                </div>
              </div>

              {/* Quantity controls & item total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 border-slate-800 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.key, -1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.key, 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-cyan-400 font-extrabold text-base block">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.key)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3">
              Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Total Items</span>
                <span className="text-white font-bold">{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">Free (Digital)</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between text-sm">
                <span className="text-white font-bold uppercase">Total Order Amount</span>
                <span className="text-cyan-400 text-xl font-black">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white w-full text-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
