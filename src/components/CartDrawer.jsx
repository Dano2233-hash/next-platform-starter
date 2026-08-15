import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, X } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice.js';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#090e1c] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-white text-base">Your Cart</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-60" />
              <p className="text-sm font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-xs text-slate-500 mt-1">Explore our catalog and add items</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex gap-3 items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate">{item.name}</h4>
                  {item.selectedPackage && (
                    <div className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                      Pkg: {item.selectedPackage}
                    </div>
                  )}
                  <div className="text-xs font-extrabold text-blue-400 mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
