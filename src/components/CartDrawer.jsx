import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
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
    totalPrice,
    totalItems
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b16] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-[#05070f]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-extrabold text-white">Your Shopping Cart</h2>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-300">Your cart is currently empty</p>
                  <p className="text-xs text-slate-500">Browse games, top-ups, and gift cards to add items.</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex gap-3 items-center group hover:border-slate-700 transition-all"
                >
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      name={item.name}
                      category={item.category}
                      platform={item.platform}
                      className="h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                    <p className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                      {item.packageName}
                    </p>
                    <p className="text-xs font-black text-slate-200 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Delete Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-slate-800 bg-slate-950 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#05070f] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-semibold">Total Amount:</span>
                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2 px-4 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 text-center transition-all"
                >
                  View Full Cart Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
