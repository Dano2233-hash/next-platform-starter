import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Zap, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Look like you haven't added any game top-ups or gift cards yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-950/50"
        >
          Explore Gaming Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-black text-slate-100">Shopping Cart</h1>
          <span className="text-xs font-extrabold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
            {cartItems.reduce((a, b) => a + b.quantity, 0)} Items
          </span>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Cart Table */}
        <div className="lg:col-span-8 bg-[#090d1c] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="divide-y divide-slate-800/80">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <ProductImage
                      product={{
                        name: item.name,
                        image: item.image,
                        category: item.category,
                        platform: item.platform,
                      }}
                      className="h-16"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{item.name}</h3>
                    <p className="text-[11px] text-cyan-400 font-semibold">
                      Package: {item.packageName || 'Standard'}
                    </p>
                    <p className="text-[10px] text-slate-500">{item.platform} • {item.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="p-1 text-slate-300 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-black text-slate-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="p-1 text-slate-300 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-sm font-black text-cyan-400 block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {formatPrice(item.price)} each
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-4 bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
          <h3 className="font-bold text-slate-100 border-b border-slate-800/80 pb-3">Order Summary</h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Currency</span>
              <span className="font-bold text-cyan-400">IQD</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
              <span className="font-extrabold text-slate-100">Total</span>
              <span className="font-black text-cyan-300 text-base">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="block text-center text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors pt-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
