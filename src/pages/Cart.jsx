import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            You haven't added any digital games, top-ups, or gift cards to your cart yet.
          </p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
        >
          Explore Games & Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your digital items before manual local payment</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300">
                    {item.product.platform || 'PC'}
                  </span>
                  <h3 className="font-bold text-sm text-slate-100">{item.product.name}</h3>
                </div>
                <p className="text-xs text-cyan-400 font-medium">Package: {item.packageName}</p>
                <p className="text-xs text-slate-400">{formatPrice(item.unitPrice)} each</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                {/* Quantity Control */}
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#0c1021] border border-[#1a223e] rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Digital Service Fee</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-black text-white">
              <span>Total IQD</span>
              <span className="text-cyan-400 text-lg">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Manual Payment Notice
            </div>
            <p>Order details will be submitted for FastPay, Korek, or MasterCard local processing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
