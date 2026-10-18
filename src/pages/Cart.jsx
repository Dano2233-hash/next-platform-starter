import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Your Cart is Currently Empty</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
          Browse our catalogue of digital games, PUBG UC, Steam Wallet, and subscriptions.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-400 text-xs mt-1">Review your items before proceeding to checkout</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartKey}
              className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mb-1">
                    {item.platform}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">{item.name}</h3>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">Package: {item.selectedPackage}</p>
                  <p className="text-cyan-400 font-extrabold text-sm sm:text-base mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-extrabold text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total</span>
                  <span className="text-white font-black text-sm sm:text-base">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartKey)}
                  className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-[#0b0f1d] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total ({cart.reduce((acc, i) => acc + i.quantity, 0)})</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE Instant Digital</span>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="text-slate-200 font-extrabold text-sm">Total Amount</span>
              <span className="text-cyan-400 font-black text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
