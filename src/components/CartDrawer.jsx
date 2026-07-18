import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, cartState }) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = cartState;

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  const handleCartPageClick = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#050505] border-l border-blue-500/10 shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-6 border-b border-blue-500/10 flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
              YOUR SHOPPING CART
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-blue-950/30 flex items-center justify-center text-cyan-400 border border-blue-500/20">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Your Cart is Empty</h3>
                  <p className="text-xs text-gray-400 mt-1">Explore our epic library to add digital products.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold uppercase rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => {
                const pkgId = item.selectedPackage?.id || 'base';
                const price = item.selectedPackage ? item.selectedPackage.price : item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${pkgId}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0f1d]/50 border border-white/[0.03] hover:border-blue-500/10 transition"
                  >
                    {/* Tiny representation icon */}
                    <div className="h-14 w-14 rounded-lg bg-gradient-to-tr from-blue-900 to-indigo-950 border border-white/5 flex items-center justify-center text-[10px] font-bold text-cyan-400 flex-shrink-0">
                      {item.selectedPackage ? 'PKG' : 'GAME'}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{item.product.name}</h4>
                      {item.selectedPackage && (
                        <p className="text-[10px] text-cyan-400 font-extrabold tracking-wide uppercase truncate mt-0.5">
                          Package: {item.selectedPackage.name}
                        </p>
                      )}
                      <p className="text-xs font-black text-cyan-200 mt-1">{formatPrice(price)}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.product.id, pkgId)}
                        className="text-gray-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1.5 bg-black/40 rounded-md border border-white/5 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, pkgId, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, pkgId, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-blue-500/10 bg-[#030303] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-medium">Cart Total:</span>
                <span className="text-xl font-black text-white">{formatPrice(getCartTotal())}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCartPageClick}
                  className="w-full py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-gray-300 hover:bg-white/5 hover:border-gray-400 transition"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black uppercase text-white shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-400 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
