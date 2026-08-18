import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { ProductImage } from './ProductImage';

export function CartDrawer({ isOpen, onClose, cart, removeFromCart, updateQuantity, totalPrice }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 text-white shadow-2xl border-l border-slate-800 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-800/80">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Looks like you haven't added any games or top-ups yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/20"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                    <ProductImage
                      image={item.productImage}
                      name={item.productName}
                      category={item.category}
                      platform={item.platform}
                      className="h-20"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-white line-clamp-1">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                        Package: {item.packageName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700/80 rounded-lg bg-slate-900">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/60 flex flex-col gap-3">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-slate-500">
                Prices formatted in Iraqi Dinar (IQD). Instant digital delivery after payment confirmation.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="py-3 px-4 rounded-xl font-bold text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-center"
                >
                  View Full Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all"
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
