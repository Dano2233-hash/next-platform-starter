import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleGoToCartPage = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0e17] border-l border-slate-800 shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold text-slate-100 text-lg">Your Cart</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {totalItems} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-300 font-bold text-base">Your cart is empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our PUBG UC, Steam Games, Gift Cards, and Subscriptions!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-cyan-400 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {item.platform}
                      </span>
                      <h4 className="font-bold text-slate-200 text-xs truncate">{item.name}</h4>
                    </div>

                    {item.selectedPackage && (
                      <p className="text-[11px] text-cyan-300 font-medium mt-1">
                        Package: <span className="font-bold">{item.selectedPackage}</span>
                      </p>
                    )}

                    <p className="text-xs font-black text-slate-100 mt-1">
                      {formatPrice(item.unitPrice)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleGoToCartPage}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleGoToCheckout}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Manual fast payment via FastPay, Korek, MasterCard
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
