import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">
          You haven't added any game top-ups, activation keys, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your digital items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-black text-cyan-400 text-lg">{item.productName.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">{item.productName}</h3>
                  <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold mt-1">
                    {item.packageName}
                  </span>
                  {item.extraNote && (
                    <p className="text-[11px] text-slate-400 mt-1">ID/Note: {item.extraNote}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <span className="font-black text-cyan-400 text-base block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors mt-0.5"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 sticky top-24">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
                <span className="font-bold text-white">Total Amount</span>
                <span className="font-black text-cyan-400 text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> FastPay, Korek, MasterCard supported
              </div>
              <p>Delivery via instant order page and direct support.</p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
