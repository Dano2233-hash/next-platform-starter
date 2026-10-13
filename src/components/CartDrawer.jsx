import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b18] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-orbitron font-bold text-lg">Your Cart</h2>
              <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                {totalItems}
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-slate-300 text-base">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1">Explore our products and top-ups to get started!</p>
                </div>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400"
                >
                  Browse Store
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className="p-3 bg-[#0c1224] border border-slate-800/80 rounded-xl flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      image={item.image}
                      name={item.name}
                      platform={item.platform}
                      category="Product"
                      className="h-16 w-16"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-orbitron font-semibold text-xs text-slate-200 line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-mono mt-0.5">{item.packageName}</p>
                    <p className="text-xs font-bold text-slate-100 font-mono mt-1">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border border-slate-700 rounded bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-cyan-400">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#050814] space-y-4">
              <div className="flex justify-between items-baseline font-orbitron">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Subtotal</span>
                <span className="font-extrabold text-lg text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg border border-slate-700 text-center font-bold text-xs text-slate-200 hover:bg-slate-800"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:from-cyan-400 hover:to-blue-500"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
