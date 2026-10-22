import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">

          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-wider">
                Your Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 border border-slate-700">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-200 text-sm">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our catalog for games, top-ups, gift cards and subscriptions!
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 text-xs font-bold rounded-lg shadow-md"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3 relative group"
                >
                  <div className="w-14 h-14 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-cyan-400 font-bold border border-slate-700">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      item.platform
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-200 truncate">{item.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[10px] text-cyan-400 font-semibold block">
                        Package: {item.selectedPackage.name}
                      </span>
                    )}
                    <span className="text-xs font-extrabold text-cyan-300 block mt-1">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-200 px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Items</span>
                <span className="font-bold text-slate-200">{cart.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-extrabold text-slate-100 pt-2 border-t border-slate-800">
                <span>Subtotal Amount</span>
                <span className="text-lg text-cyan-300">{formatPrice(getCartTotal())}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={clearCart}
                  className="py-2 px-3 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 text-xs font-bold transition-all"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
