import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export function CartDrawer() {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, totalItemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b18] border-l border-slate-800 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-lg text-white">Your Cart ({totalItemCount})</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h4 className="font-bold text-slate-300 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explore our gaming store for instant top-ups, games, gift cards, and subscriptions.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold text-xs hover:bg-cyan-500 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-100 truncate">{item.name}</h4>
                    <span className="text-[11px] text-cyan-400 block font-medium mt-0.5">
                      {item.packageName}
                    </span>
                    <span className="text-xs font-extrabold text-white mt-1 block">
                      {formatPrice(item.unitPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-200">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total</span>
                <span className="text-xl font-extrabold text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 font-semibold text-xs text-center transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1 transition-all"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
