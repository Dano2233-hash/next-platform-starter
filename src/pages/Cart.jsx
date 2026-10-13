import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-orbitron font-extrabold text-2xl text-slate-100">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Looks like you haven't added any games, top-ups, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Store Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            SHOPPING <span className="text-cyan-400">CART</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital packages before proceeding to checkout
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 bg-[#090e1f] border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    platform={item.platform}
                    category="Product"
                    className="h-20 w-20"
                  />
                </div>

                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-cyan-400 border border-cyan-500/30">
                    {item.platform}
                  </span>
                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-purple-300 font-mono">
                    Package: {item.packageName}
                  </p>
                  <p className="text-xs font-bold text-slate-300 font-mono">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">

                {/* Quantity buttons */}
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-cyan-400">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Total</span>
                  <span className="font-orbitron font-extrabold text-sm text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#090e1f] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="font-orbitron font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Total Items</span>
              <span className="font-mono font-bold text-slate-100">{totalItems}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold uppercase">Instant Digital (FREE)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Service Tax</span>
              <span className="text-slate-400 font-mono">0 IQD</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-orbitron font-bold text-sm text-white uppercase">Grand Total</span>
              <span className="font-orbitron font-extrabold text-xl text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3.5 rounded-xl bg-[#0c1224] border border-slate-800 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Supported Manual Payment Gateways</span>
            </div>
            <p>FastPay Mobile Wallet, Korek Telecom Cash, and MasterCard / FIB cards accepted.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
