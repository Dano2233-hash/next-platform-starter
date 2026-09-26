import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingCart className="w-10 h-10 text-slate-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore our store catalog for PC games, PUBG UC, gift cards, and premium digital subscriptions!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected digital items before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#080d1f] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 shrink-0">
                  {item.productImage ? (
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center font-bold text-cyan-300 text-xs">
                      {item.productName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="font-extrabold text-slate-100 text-sm line-clamp-1">{item.productName}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{item.packageName}</p>
                </div>
              </div>

              {/* Quantity & Pricing */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 border-slate-800 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-[#0c1228] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-slate-100 text-xs px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="block font-black text-slate-100 text-base text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formatPrice(item.price)} each
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#080d1f] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-24">
            <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-tight border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400 font-semibold">
                <span>Items Subtotal</span>
                <span className="text-slate-200">{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-slate-400 font-semibold">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Digital)</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-slate-100">Total Price</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Manual Payment via FastPay, Korek &amp; MasterCard</span>
              </div>
              <p className="leading-relaxed">
                Prices formatted strictly in IQD. Instant code/top-up delivery after payment verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
