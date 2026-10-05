import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-[#070b19] border-l border-cyan-500/20 h-full flex flex-col justify-between z-10 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-lg">Your Cart</h2>
            <span className="text-xs bg-cyan-950 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
              {cart.length} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600" />
              <p className="font-semibold text-slate-300">Your shopping cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Browse our PUBG UC, game cards, and digital codes to add items.
              </p>
              <button
                onClick={() => { onClose(); navigate('/products'); }}
                className="mt-2 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-800">
                  <ProductImage
                    src={item.image}
                    alt={item.productName}
                    category={item.category}
                    platform={item.platform}
                    type={item.type}
                    className="h-16"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{item.productName}</h4>
                      <p className="text-[11px] font-semibold text-cyan-400">{item.packageName}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-sm text-cyan-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-slate-950 rounded-lg border border-slate-800 px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-slate-400 hover:text-cyan-400 text-xs p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-200 px-1.5 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-slate-400 hover:text-cyan-400 text-xs p-1"
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
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="text-lg font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { clearCart(); }}
                className="py-2.5 px-3 rounded-lg border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 font-semibold text-xs transition-colors"
              >
                Clear Cart
              </button>

              <button
                onClick={() => { onClose(); navigate('/checkout'); }}
                className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
