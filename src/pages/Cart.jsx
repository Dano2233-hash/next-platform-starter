import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="w-20 h-20 rounded-3xl bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Looks like you haven't added any games, top-ups, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <ShoppingBag className="w-7 h-7 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
            {cartItems.length} items
          </span>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="w-20 h-20 shrink-0">
                  <ProductImage product={item.product} className="h-20" />
                </div>
                <div className="space-y-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug || item.product.id}`}
                    className="font-extrabold text-white text-sm hover:text-cyan-400 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-cyan-400 font-semibold">
                    Package: {item.selectedPackage?.name}
                  </p>
                  <span className="text-xs text-slate-400 block">
                    Unit Price: {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-white block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] text-rose-400 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="font-extrabold text-white text-lg pb-3 border-b border-slate-800">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-emerald-400">FREE (Digital)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Type</span>
              <span className="font-bold text-cyan-400">Manual Local Transfer</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between text-sm">
              <span className="font-extrabold text-white">Grand Total</span>
              <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/20 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>FastPay, Korek & MasterCard manual transfers verified.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
