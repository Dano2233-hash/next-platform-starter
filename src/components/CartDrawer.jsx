import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07070f] border-l border-white/5 shadow-2xl flex flex-col justify-between">

          {/* Drawer Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-black text-lg uppercase tracking-wider">Your Shopping Cart</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content - Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Your cart is empty</h4>
                  <p className="text-gray-400 text-xs mt-1 max-w-[240px]">
                    Go browse the store and add premium gaming products to your order!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider hover:opacity-90"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedPackage}-${idx}`}
                  className="bg-[#0c0c16] border border-white/5 p-3 rounded-xl flex gap-3 relative group"
                >
                  {/* Small Product Visual fallback/image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-950">
                    <ProductImage product={item.product} className="w-full h-full" />
                  </div>

                  {/* Item Description */}
                  <div className="flex-1 space-y-1 pr-6">
                    <h5 className="text-white text-xs font-bold line-clamp-1">{item.product.name}</h5>
                    <div className="text-[10px] font-semibold text-cyan-400">
                      Package: {item.selectedPackage}
                    </div>
                    <div className="text-xs font-black text-white">{formatPrice(item.price)}</div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2.5 pt-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedPackage, -1)}
                        className="w-5 h-5 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedPackage, 1)}
                        className="w-5 h-5 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedPackage)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#05050a] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Total Price:</span>
                <span className="text-xl font-black text-white">{formatPrice(getCartTotal())}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Keep Browsing
                </button>
                <a
                  href="/checkout"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
