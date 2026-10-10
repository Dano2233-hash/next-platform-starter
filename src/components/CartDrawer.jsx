import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d1a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Your Cart ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-slate-500" />
                </div>
                <p className="font-semibold">Your cart is currently empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/30 hover:bg-cyan-500/20"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-slate-950 flex-shrink-0 overflow-hidden border border-slate-800">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cyan-400 font-extrabold text-xs bg-slate-900">
                        DS
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 truncate">
                      {item.product.name}
                    </h4>

                    {item.selectedPackage && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 font-medium my-1">
                        Package: {item.selectedPackage.name}
                      </span>
                    )}

                    <div className="text-xs font-extrabold text-cyan-400 mt-1">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-2 bg-slate-950 rounded-lg border border-slate-800 px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Amount:</span>
                <span className="text-lg font-extrabold text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                >
                  View Full Cart
                </button>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold transition-all shadow-lg shadow-blue-950/50 flex items-center justify-center gap-1.5"
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
