import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b14] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold">Shopping Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-4 stroke-1" />
                <p className="text-base font-semibold text-slate-300">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explore our products catalog for games, top-ups, and gift cards.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                        {item.product?.name?.substring(0, 2).toUpperCase() || 'DS'}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 truncate">
                        {item.product?.name}
                      </h4>
                      {item.selectedPackage && (
                        <p className="text-[11px] text-cyan-400 font-medium">
                          Package: {item.selectedPackage.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-slate-200">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity adjuster */}
                      <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-rose-400 p-1 self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Items:</span>
                <span className="font-bold text-slate-200">{cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-bold">
                <span className="text-slate-200">Total Price:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-lg font-extrabold">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 rounded-xl font-medium text-xs text-slate-400 hover:text-rose-400 transition-colors text-center"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
