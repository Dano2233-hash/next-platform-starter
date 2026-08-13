import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function CartDrawer({ cart, onClose, onUpdateQuantity, onRemove, cartTotal, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#07070c] border-l border-[#151522] text-gray-200 shadow-2xl flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#151522] px-4 py-5">
            <h2 className="text-base font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#00e5ff]" />
              <span>Shopping Cart</span>
            </h2>
            <button onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-[#12121e] hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag size={48} className="text-gray-600 mb-3" />
                <p className="text-sm font-semibold text-gray-400">Your cart is currently empty</p>
                <p className="text-xs text-gray-500 mt-1">Explore Dano Store to find premium digital top-ups!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.selectedPackage.name}`} className="flex items-center gap-3 rounded-lg border border-[#12121e] bg-[#0c0c14] p-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-[#00e5ff] font-bold mt-0.5">{item.selectedPackage.name}</p>
                    <p className="text-xs text-gray-400 mt-1 font-semibold">{formatPrice(item.selectedPackage.price)}</p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedPackage.name, item.quantity - 1)}
                      className="h-6 w-6 flex items-center justify-center rounded bg-[#12121e] border border-[#1e1e2d] text-xs font-bold hover:bg-gray-800 transition"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedPackage.name, item.quantity + 1)}
                      className="h-6 w-6 flex items-center justify-center rounded bg-[#12121e] border border-[#1e1e2d] text-xs font-bold hover:bg-gray-800 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemove(item.id, item.selectedPackage.name)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer total info */}
          {cart.length > 0 && (
            <div className="border-t border-[#151522] bg-[#090910] p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Price</span>
                <span className="text-base font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-lg border border-[#1e1e2d] py-3 text-xs font-bold text-gray-300 hover:bg-[#12121e] hover:text-white transition"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-[#0066ff] to-[#7000ff] py-3 text-xs font-black text-white hover:from-[#0055dd] hover:to-[#5e00dd] transition shadow-md"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
