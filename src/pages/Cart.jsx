import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10 stroke-1 text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          You haven't added any games, mobile top-ups, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your items and proceed to manual payment checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-xs font-bold text-cyan-300">
                      {item.product?.name?.substring(0, 2).toUpperCase() || 'DS'}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">
                    {item.product?.name}
                  </h3>
                  {item.selectedPackage && (
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                      Package: {item.selectedPackage.name}
                    </p>
                  )}
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Unit Price: {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* Quantity adjust */}
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-sm sm:text-base font-extrabold text-slate-100">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5 shadow-2xl">
          <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Processing Fee:</span>
              <span className="font-bold text-emerald-400">0 IQD (Free)</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold">
              <span className="text-slate-100">Total Price:</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Pay manually using FastPay, Korek, or MasterCard after placing order.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
