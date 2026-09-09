import React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080d1a] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold text-base text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-medium text-sm">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-cyan-400 border border-slate-700"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-3 items-center"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-100 truncate">{item.productName}</h4>
                    <p className="text-[11px] text-cyan-400 mt-0.5">{item.packageName}</p>
                    <div className="font-extrabold text-xs text-white mt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => onUpdateQuantity(item.cartKey, -1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartKey, 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove(item.cartKey)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Total & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-[#050811] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-extrabold text-cyan-300 text-base">{formatPrice(totalAmount)}</span>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Manual payments accepted: FastPay, Korek, MasterCard
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 text-center border border-slate-700"
                >
                  View Full Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-center flex items-center justify-center gap-1 font-extrabold shadow-md"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
