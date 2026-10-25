import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
            Looks like you haven't added any games or top-ups to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
        </h1>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 bg-[#090e1c] border border-slate-800 rounded-2xl flex items-center gap-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  category={item.category || 'games'}
                  platform={item.platform || 'PC'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-sm truncate">{item.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {item.selectedPackage && (
                  <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {item.selectedPackage.name}
                  </span>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-extrabold text-cyan-300">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-2 text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-extrabold">
              <span className="text-white">Total</span>
              <span className="text-cyan-300 text-lg">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
