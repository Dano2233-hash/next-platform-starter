import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080c19] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Cart Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-black tracking-tight">Your Cart</h2>
              <span className="px-2 py-0.5 text-xs font-bold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                {totalCount} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                  <Gamepad2 className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mb-6">Explore our games, top-ups, and gift cards to get started.</p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3">
                  {/* Item icon / details */}
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 shrink-0 flex items-center justify-center p-2 font-bold text-cyan-400 text-xs text-center overflow-hidden">
                    {item.platform || 'DS'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 truncate">{item.name}</h4>
                        {item.selectedPackage && (
                          <span className="inline-block text-[11px] text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-md mt-0.5">
                            {item.selectedPackage}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm font-extrabold text-cyan-400">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-slate-300 text-sm">
                <span>Subtotal</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Manual local payment via FastPay, Korek, or MasterCard upon checkout.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center text-xs font-bold text-slate-300 transition-colors"
                >
                  View Full Cart
                </Link>
                <button
                  onClick={handleCheckout}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
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
