import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
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
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-slate-100">
                Your Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-slate-200 font-bold text-base mb-1">Your cart is empty</h3>
                <p className="text-slate-400 text-xs mb-6 max-w-xs">
                  Looks like you haven't added any game codes or top-ups yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3 group">
                  <ProductImage
                    src={item.product?.image}
                    name={item.product?.name}
                    category={item.product?.category}
                    platform={item.product?.platform}
                    type={item.product?.type}
                    className="w-16 h-16 rounded-xl shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-100 text-xs sm:text-sm line-clamp-1">
                          {item.product?.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                        Package: {item.packageName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-xs text-slate-200">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Processing Fee</span>
                  <span className="text-emerald-400 font-semibold">FREE (0 IQD)</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
