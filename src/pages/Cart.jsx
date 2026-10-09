import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Looks like you haven't added any games, top-ups, or gift cards to your shopping cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs shadow-lg"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-cyan-400" />
          <span>Shopping Cart</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 underline transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                <ProductImage product={item.product} className="w-full h-full" />
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="text-sm font-bold text-slate-100">{item.product.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">Package: {item.package?.name}</p>
                <p className="text-xs text-slate-400">Unit Price: {formatPrice(item.unitPrice)}</p>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  className="p-1 hover:bg-slate-800 text-slate-300 rounded transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold px-2 text-slate-100">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  className="p-1 hover:bg-slate-800 text-slate-300 rounded transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right sm:w-28">
                <span className="text-sm font-extrabold text-cyan-400 block">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-[11px] text-slate-500 hover:text-red-400 mt-1 inline-flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold">{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-200">Total Amount</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition"
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
