import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto text-center space-y-6 bg-[#080d1a] border border-slate-800 rounded-3xl p-8 my-8">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400">
            Browse our catalog of games, top-ups, and subscriptions to get started.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg"
        >
          <span>Explore Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your items before proceeding to checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-bold underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-[#080d1a] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.productImage ? (
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-cyan-400 p-1 text-center">{item.productName.slice(0, 10)}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{item.productName}</h3>
                  {item.packageName && (
                    <p className="text-xs text-cyan-400 font-medium">Package: {item.packageName}</p>
                  )}
                  <p className="text-[11px] text-slate-400">{item.platform} • {item.type}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-cyan-300 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {formatPrice(item.price)} each
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-white">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE Digital Delivery</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-white">
                <span>Total Cost</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
