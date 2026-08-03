import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, total }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#05050d] border-l border-[#121225] flex flex-col justify-between">

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#121225] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00e5ff]" />
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">Your Cart</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-white transition-premium">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0a0a16] border border-[#1a1a2e] flex items-center justify-center text-gray-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-1">Your Cart is Empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">Explore our games, top-ups, subscriptions, and select premium digital deals to fill your cart.</p>
                <button onClick={onClose} className="bg-[#0066ff] hover:bg-[#0055dd] text-xs font-bold text-white px-5 py-2 rounded-lg transition-premium">
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedPackage}`} className="bg-[#090911] border border-[#121225] p-3 rounded-lg flex gap-3 relative group">
                  <div className="w-16 h-12 bg-black rounded overflow-hidden shrink-0">
                    <ProductImage product={item.product} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-white truncate pr-6 leading-normal">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-purple-400 font-medium truncate mt-0.5">
                      🎁 Package: {item.selectedPackage}
                    </p>
                    <div className="text-xs font-black text-[#00e5ff] mt-1">
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity Selector inside cart item */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5 bg-[#05050d] border border-[#121225] rounded px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage, -1)}
                          className="text-gray-400 hover:text-[#00e5ff] transition-premium p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage, 1)}
                          className="text-gray-400 hover:text-[#00e5ff] transition-premium p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.product.id, item.selectedPackage)}
                        className="text-gray-500 hover:text-red-500 transition-premium p-1"
                        title="Delete product option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#121225] bg-[#070712]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">Subtotal Price</span>
                <span className="text-lg font-black text-[#00e5ff]">{formatPrice(total)}</span>
              </div>

              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:from-[#0055dd] hover:to-[#6000ef] text-white text-xs font-black py-3 rounded-lg uppercase tracking-wider transition-premium shadow-md"
              >
                Proceed to Checkout
              </Link>

              <p className="text-center text-[10px] text-gray-500 mt-3 leading-relaxed">
                Prices and payment methods are formatted for Kurdistan & Iraq. manual payouts only.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
