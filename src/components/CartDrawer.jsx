import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemove, cartTotal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-[#0c0d12] border-l border-[#1a1e29] shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-[#1a1e29] flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#00e5ff]" />
                Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
              <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#151824] transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-[#151824] flex items-center justify-center text-gray-500 mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="text-sm font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-[240px]">Explore our store to find games, packages, and gift cards.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2 text-xs font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-lg transition-colors cursor-pointer select-none"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartItemId} className="flex items-center gap-3 p-3 rounded-lg bg-[#050505] border border-[#1a1e29]">
                    <div className="w-12 h-12 rounded bg-[#151824] flex items-center justify-center overflow-hidden shrink-0">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-black text-[#00e5ff]">{item.product.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.selectedPackage.name}</p>
                      <p className="text-xs font-black text-[#00e5ff] mt-1">{formatPrice(item.selectedPackage.price)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full gap-2 shrink-0">
                      <button onClick={() => onRemove(item.cartItemId)} className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-2 bg-[#151824] rounded px-1.5 py-0.5 border border-[#1a1e29]">
                        <button
                          onClick={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
                          className="text-gray-400 hover:text-white cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
                          className="text-gray-400 hover:text-white cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#1a1e29] bg-[#0c0d12]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400 font-medium">Subtotal</span>
                  <span className="text-base font-black text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="flex items-center justify-center py-2.5 rounded-lg border border-[#1a1e29] text-xs font-bold text-gray-300 hover:bg-[#151824] hover:text-white transition-colors text-center"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="flex items-center justify-center py-2.5 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-xs font-bold text-white transition-colors text-center shadow-lg shadow-[#0066ff]/20"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
