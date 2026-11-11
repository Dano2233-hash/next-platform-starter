import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#0a0f1d] border-l border-slate-800 shadow-2xl flex flex-col h-full z-10">

        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Your Cart</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {cart.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mb-3" />
              <p className="font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-xs mt-1">Browse our store and add games or top-ups.</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ProductImage
                    image={item.product.image}
                    name={item.product.name}
                    category={item.product.category}
                    platform={item.product.platform}
                    containerClassName="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-white truncate">
                    {item.product.name}
                  </h4>
                  {item.selectedPackage && (
                    <span className="text-[11px] text-cyan-400 font-medium block">
                      {item.selectedPackage.name}
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-200 mt-1 block">
                    {formatPrice(item.price)}
                  </span>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 bg-slate-950 rounded-md border border-slate-800 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-cyan-400 text-slate-400"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-cyan-400 text-slate-400"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Total Price</span>
              <span className="font-extrabold text-cyan-400 text-lg">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartDrawer;
