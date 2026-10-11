import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#090d1a] border-l border-slate-800/80 shadow-2xl h-full flex flex-col justify-between z-10 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-heading font-bold text-lg text-white">
                Your Cart ({totalItemsCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                <p className="text-sm font-medium">Your cart is currently empty</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-xl hover:bg-cyan-900/50"
                >
                  Explore Digital Store
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-slate-100 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-cyan-400 font-medium">
                      {item.selectedPackage?.name}
                    </p>
                    <span className="text-xs font-bold text-slate-300 mt-1 block">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-slate-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer / Checkout Button */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Price</span>
              <span className="font-heading font-extrabold text-xl text-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 font-semibold text-xs text-center hover:bg-slate-800 transition-colors"
              >
                View Cart Page
              </Link>
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40"
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
