import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Explore our digital store for PUBG UC, Free Fire Diamonds, Steam Games, Gift Cards, and Subscriptions!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
        >
          <span>Explore Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital gaming items before proceeding to instant payment.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-[#090f1e] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-sm">
                      DS
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="font-bold text-white text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">
                    Package: {item.selectedPackage?.name || 'Standard'}
                  </p>
                  <p className="text-xs font-extrabold text-slate-200">
                    Unit Price: {formatPrice(item.cartUnitPrice)}
                  </p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-cyan-400">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Subtotal</span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.cartUnitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(idx)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Cart Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#090f1e] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-slate-100">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Instant Digital Delivery</span>
              <span className="font-bold text-cyan-400">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Processing</span>
              <span className="font-bold text-cyan-400">0 IQD</span>
            </div>

            <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
              <span>Total Amount</span>
              <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>100% Safe Local Iraqi Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
