import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-5 bg-[#090d1a] border border-slate-800 rounded-3xl max-w-2xl mx-auto p-8 my-8">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-black text-2xl text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't added any game codes, PUBG UC, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/40"
        >
          Explore Games & Top-Ups <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Shopping Cart ({totalItemsCount} items)
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your digital items before manual payment checkout.</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 border border-rose-900/50"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-950 border border-slate-700 text-cyan-400">
                    {item.product.platform || 'Digital'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-950 text-purple-300">
                    {item.product.type || 'Item'}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-white">
                  {item.product.name}
                </h3>
                <p className="text-xs text-cyan-400 font-medium">
                  Package: {item.selectedPackage?.name}
                </p>
              </div>

              {/* Quantity & Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-6 text-center text-cyan-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Subtotal</span>
                  <span className="font-heading font-bold text-base text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-950/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="font-heading font-bold text-lg text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Items</span>
                <span className="font-semibold text-slate-200">{totalItemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-800 text-sm">
                <span className="font-bold text-slate-200">Total Amount</span>
                <span className="font-heading font-black text-xl text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-cyan-400 font-bold block flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Manual Payment Support
              </span>
              <span>FastPay, Korek, and MasterCard options available on next screen.</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
