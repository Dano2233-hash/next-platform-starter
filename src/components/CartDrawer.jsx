import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  cartTotal,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d16] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-black text-white">Your Shopping Cart</h2>
              <span className="text-xs text-slate-400">({cart.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
                <p className="text-base font-semibold text-slate-300">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explore our PUBG UC, Steam games, and gift cards to add items.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-3 items-center justify-between hover:border-slate-700 transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                        {item.platform}
                      </span>
                      <h4 className="text-xs font-bold text-slate-100 truncate">
                        {item.productName}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      Pkg: <span className="text-slate-200">{item.packageName}</span>
                    </p>
                    <p className="text-xs font-extrabold text-cyan-300 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#050811] flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-lg font-black text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="py-3 px-4 text-center rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 border border-slate-700 transition"
                >
                  View Cart
                </Link>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition"
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
