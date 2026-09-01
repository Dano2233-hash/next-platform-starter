import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ProductVisual } from '../components/ProductVisual';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartSubtotal, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-[#070c26] border border-cyan-900/30 rounded-3xl text-center space-y-4 shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          You haven't added any game top-ups, Steam keys, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-cyan-900/30 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartKey}
              className="bg-[#080e2b] border border-cyan-900/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 relative"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#05081c] shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <ProductVisual name={item.name} category={item.category} platform={item.platform} />
                )}
              </div>

              {/* Information */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-sm font-bold text-white">{item.name}</h3>
                <span className="text-xs font-semibold text-cyan-400 block mt-0.5">
                  Package: {item.selectedPackage.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  {item.platform} • {item.type}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-[#05081c] border border-cyan-900/40 rounded-xl p-1">
                <button
                  onClick={() => updateQuantity(item.cartKey, -1)}
                  className="w-7 h-7 rounded bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.cartKey, 1)}
                  className="w-7 h-7 rounded bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price & Delete */}
              <div className="text-right sm:ml-4 shrink-0">
                <div className="text-sm font-extrabold text-white">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {formatPrice(item.unitPrice)} each
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.cartKey)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors self-center"
                title="Remove Item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary Sidebox */}
        <div className="lg:col-span-4 bg-[#080e2b] border border-cyan-900/30 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white border-b border-cyan-900/30 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between text-slate-400">
              <span>Total Items:</span>
              <span className="text-slate-200 font-mono">{totalItemsCount}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span className="text-emerald-400">FREE (Digital Instant)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax / Service Fee:</span>
              <span className="text-slate-200">0 IQD</span>
            </div>
            <div className="border-t border-slate-800/80 pt-3 flex justify-between items-baseline text-sm">
              <span className="text-white font-bold">Subtotal Amount:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartSubtotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/products"
            className="block text-center text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Continue Browsing Store
          </Link>
        </div>
      </div>
    </div>
  );
};
