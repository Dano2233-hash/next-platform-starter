import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#070b18] border-l border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <span>Your Shopping Cart ({cartItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm font-semibold">Your cart is currently empty.</p>
              <button
                onClick={onClose}
                className="text-xs text-cyan-400 hover:underline font-bold"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#0c1226] border border-slate-800 rounded-xl p-3 flex gap-3 items-center"
              >
                <div className="flex-1">
                  <h4 className="text-slate-100 font-bold text-xs line-clamp-1">{item.productName}</h4>
                  <p className="text-[11px] text-cyan-400 font-medium">{item.packageName}</p>
                  <p className="text-xs font-extrabold text-slate-200 mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-cyan-400"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-100 px-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-cyan-400"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-1.5 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-sm font-extrabold text-slate-100">
              <span>Total Price:</span>
              <span className="text-cyan-400 text-base">{formatPrice(cartTotal)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center border border-slate-700"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1 shadow-lg shadow-cyan-950/50"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
