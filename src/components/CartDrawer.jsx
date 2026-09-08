import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = () => {
  const { isCartOpen, closeCart, cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080d1a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-[#0b1122]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-extrabold text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Explore our collection of digital games, top-ups, and gift cards!
                </p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-950/40"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#0d1427] p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.productImage ? (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-[10px] font-bold text-cyan-400 p-1 text-center">
                        {item.productName.slice(0, 10)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.packageName && (
                        <p className="text-[11px] text-cyan-400 font-medium">
                          Pkg: {item.packageName}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-400">
                        {item.platform} • {item.type}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-cyan-300">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#0b1122] space-y-4">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between text-sm font-extrabold text-white">
                  <span>Subtotal</span>
                  <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Manual payment processing via FastPay, Korek, or MasterCard.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleViewCart}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors text-center"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
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
};
