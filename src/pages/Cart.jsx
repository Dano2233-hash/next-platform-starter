import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected digital items before proceeding to checkout.</p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-200">Your shopping cart is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore our collection of games, mobile top-ups, gift cards, and subscriptions.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/40"
          >
            <ArrowLeft className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Cart Items Table/List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-white">{item.name}</h3>
                    {item.packageName && (
                      <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.packageName}
                      </span>
                    )}
                    <div className="text-xs font-semibold text-slate-400">
                      Unit: {formatPrice(item.unitPrice)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-800 bg-[#070b18] rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-extrabold text-xs text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price total for item */}
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-cyan-400">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
              <h3 className="font-extrabold text-lg text-white pb-3 border-b border-slate-800">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Fee</span>
                  <span className="text-cyan-400 font-bold">FREE (Digital)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-white">Total Amount</span>
                <span className="text-xl font-extrabold text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 text-xs transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
