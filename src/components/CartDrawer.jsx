import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, Shield, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d16] border-l border-slate-800 text-slate-100 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-200">Your cart is empty</h3>
                  <p className="text-xs text-slate-400">
                    Browse our products to add PUBG UC, Steam cards, or PC Games!
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center text-[10px] font-extrabold text-cyan-400 p-1 text-center">
                        {item.name.substring(0, 10)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-slate-100 truncate">
                      {item.name}
                    </h4>
                    {item.package && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 rounded">
                        {item.package}
                      </span>
                    )}
                    <div className="text-xs font-extrabold text-cyan-400">
                      {formatPrice(item.unitPrice)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end justify-between space-y-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-[#060911] space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-emerald-400">Free (Instant)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Amount</span>
                  <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={clearCart}
                  className="py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Manual verification via FastPay, Korek, MasterCard</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
