import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    totalItemsCount,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer content */}
      <div className="relative z-10 w-full max-w-md bg-[#070a14] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Your Cart</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-white font-bold text-base">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Browse our games, top-ups, and gift cards to add items to your cart.
              </p>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/products');
                }}
                className="mt-5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-3 relative group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 mr-1.5">
                        {item.platform}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 inline">
                        {item.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                    <span>Package:</span>
                    <span className="text-slate-200">{item.package.name}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-extrabold text-cyan-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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

        {/* Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#05070f] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="text-lg font-black text-cyan-400">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Manual payment in IQD. Fast verification via FastPay, Korek, or MasterCard.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/cart');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50 transition-all active:scale-95"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
