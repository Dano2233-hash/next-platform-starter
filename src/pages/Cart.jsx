import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#0a0f1d] border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-200">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            You haven't added any games, top-ups, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/40"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected digital items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items column */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-cyan-400 uppercase">{item.platform?.slice(0, 3)}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-100">{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-cyan-400 font-semibold">{item.platform}</span>
                    {item.selectedPackage && (
                      <span className="text-purple-400 font-medium">• Package: {item.selectedPackage}</span>
                    )}
                  </div>
                  <span className="text-xs font-black text-slate-200 block sm:hidden">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>

              {/* Quantity and Price row */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                {/* Qty controls */}
                <div className="flex items-center gap-2 bg-[#060a14] px-3 py-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-extrabold text-slate-100 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right hidden sm:block min-w-[100px]">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Subtotal</span>
                  <span className="text-sm font-black text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-xl sticky top-24">
            <h3 className="font-extrabold text-slate-100 text-lg border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Count:</span>
                <span className="font-bold text-slate-200">{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Fee:</span>
                <span className="font-bold text-emerald-400">FREE (Digital)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Currency:</span>
                <span className="font-bold text-cyan-400">IQD Only</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-slate-100">
                <span>Total:</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-black text-sm rounded-xl shadow-xl shadow-cyan-950/40 hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Manual payment via FastPay, Korek, or MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
