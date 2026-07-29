import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ChevronRight, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout }) {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.selectedPackage.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-md w-full flex pl-10">
        <div className="w-full bg-[#09090c] border-l border-white/5 shadow-2xl flex flex-col h-full">

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-white/30" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Your cart is empty</h3>
                  <p className="text-xs text-white/40 mt-1 max-w-[240px] mx-auto">
                    Looks like you haven't added any premium packages yet.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[11px] uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedPackage.name}-${idx}`}
                  className="flex items-start gap-3 p-3 bg-white/5 border border-white/5 rounded-lg relative group hover:border-cyan-500/20 transition-all duration-200"
                >
                  {/* Small Info / Name / Package */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded mr-1.5">
                      {item.product.platform}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate mt-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-white/50 mt-0.5">
                      Pkg: <span className="text-purple-400 font-semibold">{item.selectedPackage.name}</span>
                    </p>

                    {/* Price and quantity controller */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <span className="text-xs font-extrabold text-cyan-400">
                        {formatPrice(item.selectedPackage.price * item.quantity)}
                      </span>

                      {/* Quantity Toggler */}
                      <div className="flex items-center bg-black/40 border border-white/5 rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage.name, -1)}
                          className="px-2 py-1 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage.name, 1)}
                          className="px-2 py-1 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemove(item.product.id, item.selectedPackage.name)}
                    className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>
              ))
            )}
          </div>

          {/* Footer with totals */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-[#0a0a0d] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Subtotal</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(total)}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98 shadow-lg shadow-cyan-500/10"
                >
                  Proceed to Checkout
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer"
                >
                  View Full Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
