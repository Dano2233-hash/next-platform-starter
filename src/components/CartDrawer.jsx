import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d1a] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold text-base text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <ShoppingBag className="w-16 h-16 text-slate-700" />
                <p className="font-semibold text-slate-300">Your cart is empty</p>
                <p className="text-xs">Browse our catalog to add game top-ups, cards or subscriptions!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex gap-3 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-slate-950 flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100?text=DanoStore';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                    {item.package && (
                      <span className="inline-block text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded my-0.5">
                        {item.package}
                      </span>
                    )}
                    <div className="text-xs font-bold text-slate-200 mt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-400">Total Amount:</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
                >
                  View Cart Page
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50"
                >
                  Checkout
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
