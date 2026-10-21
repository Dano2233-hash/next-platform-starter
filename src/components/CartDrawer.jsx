import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    totalCount,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0f24] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-extrabold text-white">Your Shopping Cart</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-white">Your cart is empty</p>
                  <p className="text-xs text-slate-400">Looks like you haven't added any digital products yet.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-colors"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-cyan-400">{item.product.platform}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-[11px] font-semibold text-cyan-400">{item.package.name}</p>
                    <p className="text-xs font-extrabold text-white">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end justify-between space-y-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 space-y-3 bg-[#05070f]">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-400">Total Amount:</span>
                <span className="font-extrabold text-lg text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Manual payment via FastPay, Korek, or MasterCard
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
