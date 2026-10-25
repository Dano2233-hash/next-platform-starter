import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#070b19] border-l border-slate-800 h-full flex flex-col z-10 shadow-2xl">

        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#05070f]">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white font-semibold text-base">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">Explore our games, top-ups, and gift cards to add items.</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-cyan-400 hover:bg-slate-800"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    category={item.category || 'games'}
                    platform={item.platform || 'PC'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-white text-xs truncate">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.selectedPackage && (
                    <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded mt-0.5 border border-cyan-500/20">
                      {item.selectedPackage.name}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-cyan-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-[#05070f] space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-400">Total Price:</span>
              <span className="text-lg font-black text-cyan-300">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
