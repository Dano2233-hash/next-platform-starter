import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotalPrice, totalItemsCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080d19] border-l border-slate-800 shadow-2xl flex flex-col justify-between">

          {/* Cart Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0a1020]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-cyan-950/60 border border-cyan-500/30 rounded-xl text-cyan-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-white">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-200 text-base">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Explore our collection of games, UC top-ups, gift cards, and subscriptions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-cyan-500/20"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#0b1222] border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3.5 hover:border-slate-700 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-slate-100 text-sm truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold">
                      <span className="bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                        {item.packageName}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{item.platform}</span>
                    </div>
                    <div className="text-xs font-black text-slate-100">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="px-2 py-1 text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-slate-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="px-2 py-1 text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#090f1d] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200">{formatPrice(cartTotalPrice)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Service &amp; Delivery Fee</span>
                  <span className="text-emerald-400 font-bold">FREE (0 IQD)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-slate-200 text-sm">Total</span>
                  <span className="text-xl font-black text-cyan-300">{formatPrice(cartTotalPrice)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full text-center py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  View Full Cart Details
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant code delivery on order confirmation</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
