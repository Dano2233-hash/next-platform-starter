import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#0b101e] border border-slate-800 flex items-center justify-center mx-auto mb-4 text-cyan-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
          Looks like you haven't added any games, top-ups, or subscriptions to your cart yet.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your items before proceeding to manual checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b101e] border border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0 bg-slate-950">
                  <ProductImage
                    src={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  {item.packageName && (
                    <p className="text-xs text-cyan-400 font-semibold">{item.packageName}</p>
                  )}
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {item.platform} • {item.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Price and Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <div className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[10px] text-slate-400">
                      {formatPrice(item.price)} each
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Items:</span>
                <span className="font-bold text-white">{totalCount}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Digital Delivery Fee:</span>
                <span className="text-cyan-400 font-bold">FREE (Instant)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Currency:</span>
                <span className="text-amber-400 font-bold">IQD Only</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Grand Total:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-xl transition shadow-[0_0_20px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
