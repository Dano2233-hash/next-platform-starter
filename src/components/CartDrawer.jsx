import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070c1e] border-l border-gray-800 text-gray-100 flex flex-col justify-between shadow-2xl shadow-cyan-950">
          {/* Header */}
          <div className="p-5 border-b border-gray-800/80 flex items-center justify-between bg-[#050814]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-white text-lg">Your Cart</h3>
              <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 text-xs font-bold rounded-full border border-cyan-800">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Your cart is empty</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Browse our collection of games, top-ups, and gift cards to get started.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-cyan-500 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.itemKey}
                  className="bg-[#090e21] border border-gray-800/80 rounded-xl p-3.5 flex gap-3 relative group"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-900 overflow-hidden shrink-0 border border-gray-800 flex items-center justify-center">
                    {item.productImage ? (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-cyan-300 font-bold text-xs">
                        {item.productName?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-xs truncate">
                          {item.productName}
                        </h4>
                        {item.packageName && (
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                            {item.packageName}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-[#050814] border border-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.itemKey, -1)}
                          className="p-0.5 text-gray-400 hover:text-white rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-cyan-300 px-1.5">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, 1)}
                          className="p-0.5 text-gray-400 hover:text-white rounded"
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

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-800/80 bg-[#050814] space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Total Items:</span>
                <span className="font-bold text-white">{cartCount}</span>
              </div>

              <div className="flex items-baseline justify-between border-t border-gray-800/60 pt-2">
                <span className="text-sm font-bold text-gray-300">Total Price:</span>
                <span className="text-xl font-extrabold text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-gray-900/50 p-2 rounded-lg border border-gray-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manual Payment via FastPay, Korek or MasterCard</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    View Full Cart Page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
