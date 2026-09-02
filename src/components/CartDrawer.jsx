import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, X } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  cartTotal = 0,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#080d17] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <span>Shopping Cart ({cartItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Explore our catalog to add game top-ups or gift cards.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3 rounded-xl bg-[#0b101c] border border-slate-800/80 flex gap-3 items-center"
              >
                <ProductImage
                  product={{ name: item.name, image: item.image, platform: item.platform, category: item.category }}
                  className="w-14 h-14 rounded-lg shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                  <p className="text-[11px] text-cyan-400 font-semibold">{item.packageName}</p>
                  <p className="text-xs font-extrabold text-slate-200 mt-0.5">
                    {formatPrice(item.unitPrice)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-0.5 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-200 min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-0.5 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-[#070b13] space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Price (IQD)</span>
              <span className="text-base font-black text-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-950/50"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
