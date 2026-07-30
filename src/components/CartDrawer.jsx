import React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, navigate }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0a0a0f] border-l border-white/5 shadow-2xl flex flex-col">

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1">Explore our hot deals and premium games!</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.packageName || 'base'}-${index}`}
                  className="flex gap-3 bg-[#0d0d12] border border-white/5 p-3.5 rounded-2xl relative group"
                >
                  {/* Image Placeholder/Visual */}
                  <div className="w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center font-bold text-xs">
                        {item.name[0]}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    {item.packageName && (
                      <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded mt-1 inline-block">
                        {item.packageName}
                      </span>
                    )}
                    <div className="text-xs font-black text-[#00e5ff] mt-2">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity & Delete Actions */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeFromCart(item.productId, item.packageName)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Qty incrementer */}
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-0.5 mt-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.packageName, -1)}
                        className="w-5 h-5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.packageName, 1)}
                        className="w-5 h-5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Preview */}
          {cart.length > 0 && (
            <div className="border-t border-white/5 p-6 bg-[#08080c] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Total Price:</span>
                <span className="text-base font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="bg-white/5 hover:bg-white/10 text-zinc-300 font-bold py-3 px-4 rounded-xl text-xs transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1 shadow-lg shadow-blue-500/10 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
