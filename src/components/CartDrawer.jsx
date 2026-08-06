import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onUpdateQuantity, total }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#08080b] border-l border-slate-900 shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#00e5ff]" />
              <h2 className="text-lg font-black tracking-tight text-white uppercase">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-xs">
                  Browse our game collection, top-ups, and subscriptions to add items to your cart!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="mt-6 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#0066ff]/10"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-slate-950 border border-slate-900/60 hover:border-slate-800 transition-colors"
                >
                  {/* Thumbnail / Image Fallback */}
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-900 bg-slate-900 flex items-center justify-center">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-black flex items-center justify-center font-black text-xs text-[#00e5ff]">
                        {item.product.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-white truncate hover:text-[#00e5ff] transition-colors">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 text-ellipsis overflow-hidden">
                        Pkg: {item.selectedPackageName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Price */}
                      <span className="text-sm font-extrabold text-[#00e5ff]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 rounded-lg bg-slate-900/40 hover:bg-red-500/10 text-slate-500 hover:text-red-500 border border-slate-900 hover:border-red-500/20 transition-all self-start cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Info */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#040406] border-t border-slate-900/60">
              <div className="flex justify-between items-baseline mb-5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Subtotal</span>
                <span className="text-2xl font-black text-white">{formatPrice(total)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl border border-slate-800 transition-all text-center cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0055dd] text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#0066ff]/15 group cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
