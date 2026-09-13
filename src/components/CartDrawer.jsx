import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090e1a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-extrabold text-base text-white tracking-tight">Your Cart</h2>
              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
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
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-200">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Explore our PUBG UC, paid games, gift cards, and subscriptions to add items.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 relative group"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                    <ProductImage
                      image={item.product?.image}
                      name={item.product?.name}
                      category={item.product?.category}
                      platform={item.product?.platform}
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 truncate pr-4">
                          {item.product?.name}
                        </h4>
                        <span className="text-[11px] text-cyan-400 font-medium block">
                          Package: {item.packageName}
                        </span>
                        {item.accountDetails && (
                          <span className="text-[10px] text-slate-400 block truncate">
                            ID: {item.accountDetails}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-800/60">
                      <span className="text-xs font-extrabold text-cyan-400">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-200 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-slate-400 hover:text-white p-0.5"
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

          {/* Summary & Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manual verification via FastPay / Korek / MasterCard</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
