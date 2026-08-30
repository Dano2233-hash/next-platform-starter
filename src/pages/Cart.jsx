import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveFromCart, onClearCart, cartTotal }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your digital items before proceeding to payment.</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 bg-red-950/40 border border-red-800/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Browse our store for top-ups, game keys, gift cards, and subscriptions.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.itemKey}
                className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage product={item.product} className="h-full w-full object-cover" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                      {item.product.platform} &bull; {item.product.type}
                    </span>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.product.name}</h3>
                    {item.packageItem && (
                      <span className="text-xs text-blue-400 font-semibold bg-blue-950/60 border border-blue-900/60 px-2 py-0.5 rounded inline-block mt-1">
                        Package: {item.packageItem.name}
                      </span>
                    )}
                    <div className="mt-1 text-xs text-slate-400 sm:hidden">
                      Unit Price: {formatPrice(item.unitPrice)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                    <button
                      onClick={() => onUpdateQuantity(item.itemKey, -1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.itemKey, 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total item price */}
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-cyan-400 block">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:block">
                      ({formatPrice(item.unitPrice)} each)
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveFromCart(item.itemKey)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE (Digital)</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Service</span>
                <span className="font-bold text-white">0 IQD</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-200">Total Price</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Manual payment via FastPay, Korek, MasterCard</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
