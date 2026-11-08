import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export function CartDrawer() {
  const { cartItems, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070b17] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-white">Your Shopping Cart</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 mt-1">Explore our games, UC packages, and gift cards to get started.</p>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <ProductImage
                      image={item.image}
                      name={item.name}
                      category={item.category}
                      platform={item.platform}
                      type={item.type}
                      className="w-14 h-14"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
                    {item.packageName && (
                      <p className="text-[11px] text-cyan-400 truncate font-mono">{item.packageName}</p>
                    )}
                    <p className="text-xs font-bold text-slate-200 font-mono mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-md px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-[#060914] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-extrabold text-cyan-300 text-lg font-mono">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Taxes & instant local delivery included. Manual payment via FastPay, Korek, or MasterCard.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-all text-center"
                >
                  View Full Cart
                </button>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-950/60 flex items-center justify-center gap-1.5 transition-all"
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

export default CartDrawer;
