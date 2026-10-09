import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#090d1a] border-l border-slate-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#070a14]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-base">Your Cart</h3>
            <span className="text-xs bg-slate-800 text-cyan-400 font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 border border-slate-800">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-slate-300 font-bold text-sm">Your cart is empty</p>
              <p className="text-slate-500 text-xs max-w-xs">
                Explore our catalog for mobile top-ups, paid PC games, and gift cards!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3 p-3 bg-slate-900/80 border border-slate-800/80 rounded-xl relative group"
              >
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-950">
                  <ProductImage product={item.product} className="w-full h-full" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-1 pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-500 hover:text-red-400 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                      Package: {item.package?.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                    <span className="text-xs font-extrabold text-slate-100">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 hover:bg-slate-800 text-slate-300 rounded transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 text-slate-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 hover:bg-slate-800 text-slate-300 rounded transition"
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

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-[#070a14] space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <button
                onClick={clearCart}
                className="text-slate-500 hover:text-red-400 underline font-medium transition"
              >
                Clear Cart
              </button>
              <span>Subtotal</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-slate-300">Total Price</span>
              <span className="text-xl font-black text-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
