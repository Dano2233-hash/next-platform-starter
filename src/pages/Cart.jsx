import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { ProductImage } from '../components/ProductImage';

export function Cart({ cart, removeFromCart, updateQuantity, totalPrice, clearCart }) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400 mb-8">
          You have no items in your shopping cart. Add your favorite game top-ups or gift cards to get started!
        </p>
        <Link
          to="/products"
          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-cyan-950/50"
        >
          Explore Games & Top-Ups
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected gaming items and proceed to checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 bg-red-950/30 px-3 py-1.5 rounded-lg border border-red-500/20"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center"
            >
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <ProductImage
                  image={item.productImage}
                  name={item.productName}
                  category={item.category}
                  platform={item.platform}
                  className="h-20"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">
                    {item.productName}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-cyan-400 font-bold mt-0.5">
                  Package: {item.packageName}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-slate-700/80 rounded-lg bg-slate-950">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-black text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-black text-sm text-white">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24 space-y-4">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-white">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-emerald-400 uppercase">FREE (Digital)</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-sm text-slate-200">Total Price</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all"
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
