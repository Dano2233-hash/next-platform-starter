import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b18] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold text-base text-slate-100">Shopping Cart</h2>
              <span className="px-2 py-0.5 text-xs bg-slate-800 text-cyan-400 rounded-full font-semibold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-200 text-sm">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 mt-1">Explore our games, top-ups, and gift cards to add items.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold text-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#0b1022] border border-slate-800/80 rounded-xl p-3 flex gap-3 relative group"
                >
                  <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center text-cyan-400 font-extrabold text-xs">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.name.slice(0, 3).toUpperCase()
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-100 text-xs truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                        Pkg: {item.packageName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-xs text-slate-200">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1 hover:text-cyan-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1 hover:text-cyan-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-[#05070f] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Delivery Fee</span>
                <span className="font-semibold text-emerald-400">FREE Instant Digital</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm">Total Amount</span>
                <span className="font-black text-base text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700/80 transition-colors text-center"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="px-3 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
