import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react'

export function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-[#080d1a] border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          You haven't added any game licenses, mobile UC, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Review items before proceeding to payment.</p>
        </div>

        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Item List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">{item.selectedPackage}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatPrice(item.price)} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#0d1326] rounded-xl p-1.5 border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-200 px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for Item */}
                <span className="text-sm font-extrabold text-cyan-300">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Right Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-[#080d1a] p-6 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Items Total ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}):</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span className="font-bold text-emerald-400">FREE (Digital)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Payment Processing:</span>
              <span className="font-bold text-cyan-400">Manual Direct</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold">
              <span className="text-white">Total Amount:</span>
              <span className="text-cyan-400 text-lg">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
