import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function CartDrawer({ isOpen, onClose, cart = [], onUpdateQty, onRemove }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.packagePrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090912] border-l border-slate-850 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-900 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">Your Cart</h2>
              <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-500">
                <ShoppingBag className="w-12 h-12 mb-3 opacity-30 text-slate-400" />
                <p className="text-sm font-bold uppercase tracking-wider mb-1">Your cart is empty</p>
                <p className="text-xs text-slate-400">Add games, top-ups or keys to get started!</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.productId}-${item.packageId}`} className="flex items-start space-x-3 bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.productName}</h4>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">{item.platform} • {item.packageName}</span>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-xs text-slate-300 font-bold">{formatPrice(item.packagePrice)}</span>
                      {/* Qty controls */}
                      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
                        <button onClick={() => onUpdateQty(item.productId, item.packageId, -1)} className="text-xs text-slate-400 hover:text-white px-1 font-bold">-</button>
                        <span className="text-xs text-white font-extrabold px-1.5">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.productId, item.packageId, 1)} className="text-xs text-slate-400 hover:text-white px-1 font-bold">+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.productId, item.packageId)} className="text-slate-500 hover:text-red-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-900 bg-[#06060c]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="text-base font-black text-cyan-400">{formatPrice(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full text-center bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black py-2.5 rounded text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/10 transition-colors"
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
