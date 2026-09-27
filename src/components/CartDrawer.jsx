import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d1a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-extrabold text-white">Your Shopping Cart</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-200">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                    Browse games, top-ups, and gift cards to get started.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 w-full h-full flex items-center justify-center font-extrabold text-cyan-400 text-xs">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-100 truncate">{item.name}</h4>
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                      {item.packageName || 'Standard Option'}
                    </p>
                    <span className="text-xs font-black text-slate-200 block mt-1">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-extrabold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/80 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-semibold uppercase text-xs">Total Amount:</span>
                <span className="text-cyan-400 font-black text-lg">{formatPrice(cartTotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-xs hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/25"
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
