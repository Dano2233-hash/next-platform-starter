import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveFromCart, cartTotal = 0 }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Your Shopping Cart</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-300">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse our store for top-ups, games, gift cards, and subscriptions to add them here.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex gap-3 items-center group"
                >
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-800">
                    <ProductImage product={item.product} height="h-16" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 truncate">
                      {item.product?.name}
                    </h4>
                    <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                      {item.selectedPackage?.name}
                    </p>
                    <p className="text-xs font-extrabold text-slate-200 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700/80 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-100 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Manual payment via FastPay, Korek, or MasterCard selected during checkout.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center border border-slate-700 transition-colors"
                >
                  View Cart
                </Link>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
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

export default CartDrawer;
