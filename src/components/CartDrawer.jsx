import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d1a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Cart Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Your Shopping Cart</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-sm text-slate-400 font-medium">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="inline-block px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-bold"
                >
                  Browse Store
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      platform={item.product.platform}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.packageName && (
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded font-semibold">
                        {item.packageName}
                      </span>
                    )}
                    <div className="text-xs font-extrabold text-cyan-400">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white"
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
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-black text-cyan-400 text-base">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold text-center hover:bg-slate-800"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold text-center flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
