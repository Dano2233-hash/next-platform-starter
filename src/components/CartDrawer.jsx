import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-extrabold text-white">Your Cart</h2>
              <span className="text-xs bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full font-bold">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm font-medium">Your cart is empty.</p>
                <button
                  onClick={closeCart}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-500/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex gap-3 items-center"
                >
                  <div className="w-16 h-16 shrink-0">
                    <ProductImage product={item.product} className="h-16" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-xs truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-medium mt-0.5">
                      Pkg: {item.selectedPackage?.name}
                    </p>
                    <p className="text-xs font-black text-white mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end space-y-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Instant code or account activation upon manual payment confirmation.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
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
